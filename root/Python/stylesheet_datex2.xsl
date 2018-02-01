<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                              xmlns:SOAP="http://schemas.xmlsoap.org/soap/envelope"
                              xmlns:pub="http://datex2.eu/schema/2/2_0"
                              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <xsl:output method="text"/>
  <xsl:strip-space elements="*"/>
    <xsl:template match="/">
      <!--predefined separator for further use-->
      <xsl:variable name="sep" select="','"/>
      <!--set column names-->
      <xsl:value-of select="concat('publicationTime', $sep,
                               'msmtSiteTableRef_id', $sep,
                            'measurementTimeDefault', $sep,
                               'measuredValue_index', $sep,
                                    'basicData_type', $sep,
                                   'vehicleFlowRate', $sep,
           'averageVehicleSpeed_numberOfInputValues', $sep,
                         'averageVehicleSpeed_value', '&#xa;')"/>
      <!--predefined separator for further use-->
      <xsl:for-each select="//pub:siteMeasurements">
          <!--get ids for each further record-->
          <xsl:variable name="ref.id" select="pub:measurementSiteReference/@id"/>
          <xsl:for-each select="pub:measuredValue">
              <!--get all required values in variables for further result concat-->
              <xsl:variable name="pub.time" select="ancestor::pub:payloadPublication/pub:publicationTime"/>
              <xsl:variable name="pub.td" select="ancestor::pub:siteMeasurements/pub:measurementTimeDefault"/>
              <xsl:variable name="index" select="@index"/>
              <xsl:variable name="pub.basd.type" select="pub:measuredValue/pub:basicData/@xsi:type"/>
              <xsl:variable name="flow.rate" select="descendant::pub:vehicleFlowRate"/>
              <xsl:variable name="in.val.used" select="descendant::pub:averageVehicleSpeed/@numberOfInputValuesUsed"/>
              <xsl:variable name="speed" select="descendant::pub:speed"/>
              <!--getting result with concat function-->
              <xsl:value-of select="concat($pub.time, $sep,
                                             $ref.id, $sep,
                                             $pub.td, $sep,
                                              $index, $sep,
                                      $pub.basd.type, $sep,
                                          $flow.rate, $sep,
                                        $in.val.used, $sep,
                                            $speed, '&#xa;')"/>
          </xsl:for-each>
      </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>