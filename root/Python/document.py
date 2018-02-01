from io import StringIO
from lxml import etree
import pandas as pd
import numpy as np
import urllib
import gzip
import pathlib
import os
import time

def convertXmlToDataframe():

    urllib.request.urlopen(urllib.request.Request('http://opendata.ndw.nu/trafficspeed.xml.gz'))
    urllib.request.urlretrieve('http://opendata.ndw.nu/trafficspeed.xml.gz','raw_ndw_data/recieved_trafficspeed.gz')
    with gzip.open('raw_ndw_data/recieved_trafficspeed.gz', 'rb') as f:
        temp = f.read()

    with open('raw_ndw_data/recieved_trafficspeed.xml', 'wb') as f:
        f.write(temp)

    doc = etree.parse('raw_ndw_data/recieved_trafficspeed.xml')
    xsl = etree.parse('stylesheet_datex2.xsl')
    transform = etree.XSLT(xsl)
    result = str(transform(doc))
    pd.read_csv(StringIO(result)).to_csv('csv_files/dataframe_trafficspeed.csv',sep=';',index=False, encoding='utf-8-sig')


def calculate_mean():
    convertXmlToDataframe()

    if pathlib.Path('average_multiple_datasets.csv').is_file():
        average_dataframe = pd.read_csv('average_multiple_datasets.csv',sep=';')
        average_dataframe['vehicleFlowRate'] = average_dataframe['vehicleFlowRate'] * average_dataframe['amount_of_document_means']
        average_dataframe['averageVehicleSpeed_numberOfInputValues'] = average_dataframe['averageVehicleSpeed_numberOfInputValues'] * average_dataframe['amount_of_document_means']
        average_dataframe['averageVehicleSpeed_value'] = average_dataframe['averageVehicleSpeed_value'] * average_dataframe['amount_of_document_means']

        df = pd.read_csv('csv_files/dataframe_trafficspeed.csv', sep=';')
        con_df_remove_zero = df.replace(0, np.NaN)
        dataframe = con_df_remove_zero.replace(-1, np.NaN)
        dataframe['amount_of_document_means'] = np.where(np.isnan(dataframe.vehicleFlowRate) & np.isnan(dataframe.averageVehicleSpeed_numberOfInputValues) & np.isnan(dataframe.averageVehicleSpeed_value), 0, 1)

        df = pd.concat([dataframe,average_dataframe],axis=0)

        df = pd.concat([df.groupby(['msmtSiteTableRef_id', 'measuredValue_index'])[
                                'vehicleFlowRate', 'averageVehicleSpeed_numberOfInputValues', 'averageVehicleSpeed_value','amount_of_document_means'].sum()],axis=1)

        df['vehicleFlowRate'] = df['vehicleFlowRate'] / df['amount_of_document_means']
        df['averageVehicleSpeed_numberOfInputValues'] = df['averageVehicleSpeed_numberOfInputValues'] / df['amount_of_document_means']
        df['averageVehicleSpeed_value'] = df['averageVehicleSpeed_value'] / df['amount_of_document_means']
        df.to_csv('average_multiple_datasets.csv', sep=';')
        os.remove('csv_files/dataframe_trafficspeed.csv')

    else:
        dfs = []
        dfs.append(pd.read_csv('csv_files/dataframe_trafficspeed.csv', sep=';'))

        df = pd.concat(dfs, axis=0)
        con_df_remove_zero = df.replace(0, np.NaN)
        con_df_remove_negative = con_df_remove_zero.replace(-1, np.NaN)
        con_df = pd.concat([con_df_remove_negative.groupby(['msmtSiteTableRef_id','measuredValue_index'])[
                            'vehicleFlowRate', 'averageVehicleSpeed_numberOfInputValues', 'averageVehicleSpeed_value'].mean()],axis=1)
        con_df['amount_of_document_means'] = 1
        con_df.to_csv('average_multiple_datasets.csv', sep=';')

        os.remove('csv_files/dataframe_trafficspeed.csv')

def location_data():
    doc = etree.parse('location_trafficspeed.xml')
    xsl = etree.parse('remove_soap.xslt')
    transform = etree.XSLT(xsl)
    result = str(transform(doc))

    pandas = StringIO(result)
    doc = etree.parse(pandas)
    xsl = etree.parse('stylesheet_MST.xslt')
    transform = etree.XSLT(xsl)
    result = str(transform(doc))

    df = pd.read_csv(StringIO(result),error_bad_lines=False)
    df.to_csv("MST.csv",sep=';', index = False)

timeout = time.time() + 60*5   # 5 minutes from now
while True:
    calculate_mean()
    if time.time() > timeout:
        break