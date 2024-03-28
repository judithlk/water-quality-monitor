import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./services/db.mjs";
import { Meter } from "./components/Meters/Meter.js";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import { faHandHoldingDroplet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const showInfo = () => {
  if(document.getElementById('project-info').style.display === 'none'){
    document.getElementById('project-info').style.display = 'block';
  } else {
    document.getElementById('project-info').style.display = 'none';
  }
}

export default function App() {
  const [para, setPara] = useState([0,0,0]);
  const labels = ["Volts", "ppm", "°C"];
  useEffect(() => {
    var volt = 0;
    var tds = 0;
    var temp = 0;
    const snapshotRef = ref(database, '/');
    onValue(snapshotRef, (snapshot) => {
      const value = snapshot.val();
      
      var keys1 = Object.keys(value.tdsReadings);
      var keys2 = Object.keys(value.tempReadings);

      var len1 = keys1.length;
      var len2 = keys2.length;

      var valTV = value.tdsReadings;
      var valTemp = value.tempReadings;

      console.log(valTV);
      console.log(valTemp);

      var data1 = Object.values(valTV);
      var data2 = Object.values(valTemp);


      for (var i = 0; i < len1; i++) {
        volt += data1[i].voltage * 1
        tds += data1[i].tds * 1
      }

      for (var j = 0; j < len2; j++) {
        temp += data2[j].temperature * 1
      }

      volt = Math.round((volt / len1) * 1)/100;
      tds = Math.round((tds / len1) * 1)/100;
      temp = Math.round((temp / len2) * 100)/100;
      setPara([volt, tds, temp]);
    });
  }, [])

  return (
    <>
      <Container fluid style={{backgroundColor: "#2774AE", marginBottom: "8vh"}}>
        <Row style={{padding: "2vh"}}>
          <h1 style={{color: '#D6F8D6'}}>Water Quality Monitor <FontAwesomeIcon icon={faHandHoldingDroplet} /></h1>
          <div className="det-button">
            <br />
            <h5 onClick={showInfo} style={{color: "white", cursor: "pointer", fontSize: '1.5em'}}>Read More...</h5>
            <p id="project-info" style={{display: 'none', color: '#efefef' , fontWeight: "300"}}>A project by GROUP ALPHA, 400 level students of the Department of Computer Engineering for 1st Semester of 2022/23 Academic Session. <br /> Members: ABDULRASHEED Kamil Muhammed (19/30GR001) & ADENIRAN Ayomide Victor (19/30GR008)
            <br />The primary function of this project is to test the quality of water, under the parameters <b>Electrical conductivity (EC), Total dissolved solids (TDS),</b> and <b>temperature</b>.</p>
          </div>
        </Row>
      </Container>
      <Container fluid>
        <Row className="justify-content-center" style={{marginBottom: "20vh"}}>
          <Col md={4} sm={7} className="meter-container justify-content-center" style={{marginBottom: "2vh"}}>
            {para && <Meter label={labels[0]} param={para[0]} color1={"#89CFF0"} color2={"#0070BB"}/>}   
            <div style={{width: "100%", textAlign: "center"}}>
              <h5>Electrical conductivity</h5>
            </div>  
          </Col>
          <Col md={4} sm={7} className="meter-container justify-content-center" style={{marginBottom: "2vh"}}>
            {para && <Meter label={labels[1]} param={para[1]} color1={"#F0F8FF"} color2={"#003262"}/>}       
            <div style={{width: "100%", textAlign: "center"}}>
              <h5>Total dissolved solids</h5>
            </div>
          </Col>
          <Col md={4} sm={7} className="meter-container justify-content-center" style={{marginBottom: "2vh"}}>
            {para && <Meter label={labels[2]} param={para[2]} color1={"#007BA7"} color2={"#FF0000"}/>}       
            <div style={{width: "100%", textAlign: "center"}}>
              <h5>Temperature</h5>
            </div>
          </Col>

        </Row>
        <Row className="justify-content-center" style={{marginTop: "2vh", textAlign: "center", fontWeight: "bold"}}>
          <Col className="justify-content-center">
            <p>Built by Group ALPHA, 2024</p>
          </Col>
        </Row>
       </Container>
    </>
  );
}