import React from "react";
import { Grid, Col, Card, Text, Metric, Title, Flex, Badge, Legend, CategoryBar, ProgressBar } from "@tremor/react";
import thermometer from "../img/thermometer.png";
import humidity_img from "../img/Humity.png";
import co2 from "../img/co2.png";
import pluviometro from '../img/pluviometro.png'
import humedad_suelo from '../img/analisis-de-suelos.png'
import {
  StatusOnlineIcon
} from "@heroicons/react/outline";

function convertCelsiusToFahrenheit(celsius) {
  return ((celsius * 1.8) + 32).toFixed(2);
}

function formatCelsius(celsius) {
  return (celsius * 1).toFixed(2);
}

const CardBase = ({ last_data }) => {

  /*const [last_data,setLast_data]=useState([])
  
  function fetch_last_data(){
    fetch(url_data).then(response=>response.json()).then(resjson=>{
      setLast_data(resjson[resjson.length-1])
      console.log(resjson[resjson.length-1])
    })
  }
*/

  return (
    <Grid
      numItems={1}
      numItemsSm={2}
      numItemsLg={3}
      className="gap-2"
    >
      <Col numColSpan={1} numColSpanLg={2}>
        <Card decoration="top" decorationColor="red">
          <Flex justifyContent="center">
            <Title>Temperatura actual</Title>
          </Flex>
          <Flex className="mt-6">
            <div>
              <img
                alt="Temperatura"
                src={thermometer}
                style={{
                  height: 60,
                  widows: 60
                }}
              />
            </div>
            <Metric>{formatCelsius(last_data.temperatura)}°C / {convertCelsiusToFahrenheit(last_data.temperatura)}°F</Metric>
            <Badge icon={StatusOnlineIcon}>LIVE</Badge>
          </Flex>
          <Flex className="mt-6">
            <Text>Medidor de temperatura (°C)</Text>
            <Text>{last_data.temperatura}°C</Text>
          </Flex>
          <CategoryBar
            values={[20, 10, 70]}
            colors={["sky", "orange", "rose"]}
            markerValue={last_data.temperatura}
            className="mt-3"
          />
          <Flex className="mt-6">
            <Text>Medidor de temperatura (°F)</Text>
            <Text>{convertCelsiusToFahrenheit(last_data.temperatura)}°F</Text>
          </Flex>
          <CategoryBar
            values={[68, 18, 14]}
            colors={["sky", "orange", "rose"]}
            markerValue={convertCelsiusToFahrenheit(last_data.temperatura)}
            className="mt-3"
          />
          <Legend
            className="mt-3"
            categories={["Frío", "Cálido", "Caliente"]}
            colors={["blue", "orange", "red"]}
          />
        </Card>
      </Col>

      <Card decoration="top" decorationColor="sky">
        <Flex justifyContent="center">
          <Title>Humedad actual</Title>
        </Flex>
        <Flex className="mt-6">
          <div>
            <img
              alt="Humedad"
              src={humidity_img}
              style={{
                height: 60,
                widows: 60
              }}
            />
          </div>
          <Metric>{last_data.humedad_relativa}%</Metric>
          <Badge icon={StatusOnlineIcon}>LIVE</Badge>
        </Flex>
        <Flex className="mt-6">
          <Text className="mt-6">Medidor de humedad</Text>
          <Text className="mt-6">{last_data.humedad_relativa}%</Text>
        </Flex>
        <ProgressBar value={last_data.humedad_relativa} color="blue" className="mt-3" />
        <Legend
          className="mt-3"
          categories={["Nivel de húmedad"]}
          colors={["blue"]}
        />
      </Card>
      <Card decoration="top" decorationColor="stone">
        <Flex justifyContent="center">
          <Title>CO2 registrado</Title>
        </Flex>
        <Flex className="mt-6">
          <div>
            <img
              alt="CO2"
              src={co2}
              style={{
                height: 60,
                windows: 60
              }}
            />
          </div>
          <Metric>{last_data.CO2} mg</Metric>
          <Badge icon={StatusOnlineIcon}>LIVE</Badge>
        </Flex>
        <Flex className="mt-6">
          <Text className="mt-6">Medidor de CO2</Text>
          <Text className="mt-6">{last_data.CO2}mg</Text>
        </Flex>
        <ProgressBar value={last_data.CO2} color="stone" className="mt-3" />
        <Legend
          className="mt-3"
          categories={["Nivel de CO2"]}
          colors={["stone"]}
        />
      </Card>
      <Card decoration="top" decorationColor="teal">
        <Flex justifyContent="center">
          <Title>Pluviometro</Title>
        </Flex>
        <Flex className="mt-6">
          <div>
            <img
              alt="pluviometro"
              src={pluviometro}
              style={{
                height: 60,
                widows: 60
              }} />
          </div>
          <Metric>{last_data.pluviometro} l/m2</Metric>
          <Badge icon={StatusOnlineIcon}>LIVE</Badge>
        </Flex>
        <Flex className="mt-6">
          <Text className="mt-6">Pluviometro</Text>
          <Text className="mt-6">{last_data.pluviometro}l/m2</Text>
        </Flex>
        <ProgressBar value={last_data.pluviometro} color="teal" className="mt-3" />
        <Legend
          className="mt-3"
          categories={["Pluviometro"]}
          colors={["teal"]}
        />
      </Card>
      <Card decoration="top" decorationColor="indigo">
        <Flex justifyContent="center">
          <Title>Humedad del suelo</Title>
        </Flex>
        <Flex className="mt-6">
          <div>
            <img
              alt="humedad_suelo"
              src={humedad_suelo}
              style={{
                height: 60,
                widows: 60
              }} />
          </div>
          <Metric>{last_data.humedad_suelo} %</Metric>
          <Badge icon={StatusOnlineIcon}>LIVE</Badge>
        </Flex>
        <Flex className="mt-6">
          <Text className="mt-6">Medidor de humedad del suelo</Text>
          <Text className="mt-6">{last_data.humedad_suelo}%</Text>
        </Flex>
        <ProgressBar value={last_data.humedad_suelo} color="indigo" className="mt-3" />
        <Legend
          className="mt-3"
          categories={["Nivel de húmedad del suelo"]}
          colors={["indigo"]}
        />
      </Card>
    </Grid>
  )
}


export default CardBase