<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                              xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                              xmlns:pub="http://datex2.eu/schema/2/2_0"
                              xmlns:xsi="http://www.w3.org/2001/XMLSchemainstance">
  <xsl:output method="text"/>
  <xsl:strip-space elements="*"/>
    
  <xsl:template match="/soapenv:Envelope">

    
    <xsl:text>latitude,longitude</xsl:text>
    <!--<xsl:text>publicationTime,country,nationalIdentifier,msmtSiteTableRef_version,msmtSiteTableRef_id,</xsl:text>
    <xsl:text>measurementSiteRecord_id,measurementSiteRecord_version,measurementSiteRecordVersionTime,</xsl:text>
    <xsl:text>measurementEquipmentTypeUsed,value_lang,vehicleType, measuredValue_index,basicData_type,vehicleFlowRate,averageVehicleSpeed_numberOfInputValues,averageVehicleSpeed_value</xsl:text>-->
    <xsl:text>&#xa;</xsl:text>
    <xsl:apply-templates select="soapenv:Body"/>
  </xsl:template>

  <xsl:template match="soapenv:Body">
    
    <xsl:apply-templates select="d2LogicalModel"/>
  </xsl:template>

  <xsl:template match="d2LogicalModel">
         
    <xsl:apply-templates select="pub:payloadPublication"/>
  </xsl:template>

  <xsl:template match="pub:payloadPublication">
         <xsl:value-of select="concat('id',',',
                    'latitude',',',
                    'longitude',',',
                    'SiteName',',',
                    'StartLat',',',
                    'StartLong',',',
                    'EndLat',',',
                    'EndLong', ('&#xa;'))"/>
    <xsl:apply-templates select="pub:measurementSiteTable"/>
  </xsl:template>

  <xsl:template match="pub:measurementSiteTable">
    <xsl:apply-templates select="pub:measurementSiteRecord"/>
  </xsl:template>

  <xsl:template match="pub:measurementSiteRecord">
    <!--<xsl:value-of select="concat(ancestor::pub:payloadPublication/pub:measurementSiteTable/pub:measurementSiteLocation/pub:locationContainedInItinerary/pub:location/pub:locationForDisplay/pub:latitude,',',
                                 ancestor::pub:payloadPublication/pub:measurementSiteTable/pub:measurementSiteLocation/pub:locationContainedInItinerary/pub:location/pub:locationForDisplay/pub:longitude)"/>
    <xsl:text>&#xa;</xsl:text>-->

   <xsl:value-of select="concat(@id,',',
                                descendant::pub:latitude,',',
                                descendant::pub:longitude,',',
                                descendant::pub:measurementSiteName/pub:values,',',
                                descendant::pub:linearExtension/pub:linearByCoordinatesExtension/pub:linearCoordinatesStartPoint/pub:pointCoordinates/pub:latitude,',',
                                descendant::pub:linearExtension/pub:linearByCoordinatesExtension/pub:linearCoordinatesStartPoint/pub:pointCoordinates/pub:longitude,',',
                                 descendant::pub:linearExtension/pub:linearByCoordinatesExtension/pub:linearCoordinatesEndPoint/pub:pointCoordinates/pub:latitude,',',
                                descendant::pub:linearExtension/pub:linearByCoordinatesExtension/pub:linearCoordinatesEndPoint/pub:pointCoordinates/pub:longitude)"/>
                <xsl:text>&#xa;</xsl:text>
  </xsl:template>

</xsl:stylesheet>