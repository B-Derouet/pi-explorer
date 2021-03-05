import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'

const InfoBanner = ({message}) => (
  <Grid style={{marginBottom: 0}}>
    <Row>
      <Col style={{marginTop: 0, marginBottom: 0, paddingLeft: 0}}>
        <div className="dark" data-ea-publisher="pi-explorer" data-ea-type="text"></div>
  {/*
        <div class="dark" data-ea-publisher="pi-explorer" data-ea-type="image"></div> 
   */}

  {/* <span id="banner-message" dangerouslySetInnerHTML={{__html: message}} /> */}
      </Col>
    </Row>
  </Grid>
)

export default InfoBanner
