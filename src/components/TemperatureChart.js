import React from "react";
import { Card, Title, TabGroup, TabList, Tab, TabPanels, TabPanel, Flex,Badge } from "@tremor/react"
import img_temp from "../img/thermometer.png";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import "bootstrap-icons/font/bootstrap-icons.css";
import {StatusOnlineIcon} from "@heroicons/react/outline";

const dataFormatterTemperatureC= (number) => `${Intl.NumberFormat("us").format(number).toString()}°C`
const dataFormatterTemperatureF= (number) => `${Intl.NumberFormat("us").format(number).toString()}°F`

//funcion para convertir grados celsius a fahrenheit
const convertCelsiusToFahrenheit = (celsius) => {
  return ((celsius * 1.8) + 32).toFixed(2);
}

const TemperatureChart = ({data}) => {


  // Encuentra los valores máximos y mínimos de temperatura°C en los datos 
 //const temperatures = TemperatureChartData.map(data => parseInt(data.temperatura));
  const temperatures = data.map(data => parseInt(data.temperatura))
  const maxTemperature = Math.max(...temperatures)+10;
  const minTemperature = 0;

 // Encuentra los valores máximos y mínimos de temperatura°F en los datos 
 //const temperaturesF = TemperatureChartData.map(data => parseInt(data.temperaturaF));
  const temperaturesF = data.map(data => parseInt(convertCelsiusToFahrenheit(data.temperatura)))
  const maxTemperatureF = Math.max(...temperaturesF)+10;
  const minTemperatureF = 0;
  
    


  return(
    <Card decoration="top" decorationColor="red">
    <TabGroup /*onLoad={addFahrenheit(overallchartdata)}*/> 
        <TabList>
          <Tab style={{ fontWeight: 'bold', fontSize: 15 }}><i className="bi bi-thermometer-sun"></i> temperatura (°C)</Tab>
          <Tab style={{ fontWeight: 'bold', fontSize: 15 }}><i className="bi bi-thermometer-sun"></i> temperatura (°F)</Tab>
        </TabList>
        <TabPanels>
        {/*Grafica con °C */}
        <TabPanel>
          <Flex>
          <Title className="mt-6">Gráfica temperatura registrada (°C)</Title>
          <Badge icon={StatusOnlineIcon}>LIVE</Badge>
          <img 
          alt="temperatura"
          src={img_temp}
          style={{
            height: 60,
            widows: 60
          }}
          />
          </Flex>
          <ResponsiveContainer className="mt-6" width="100%" height={300}>
          <AreaChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="createdAt" />
      <YAxis domain={[minTemperature,maxTemperature]}/>
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="temperatura" stroke="#FF3E16" fill="#FF3E16" formatter={dataFormatterTemperatureC}/>
    </AreaChart>
    </ResponsiveContainer>

        </TabPanel>
        {/*Grafica con °F */}
        <TabPanel>
          <Flex>
          <Title className="mt-6">Gráfica temperatura registrada (°F)</Title>
          <img 
          alt="temperatura"
          src={img_temp}
          style={{
            height: 60,
            widows: 60
          }}
          />
          </Flex>
          <ResponsiveContainer className="mt-6" width="100%" height={300}>
          <AreaChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="createdAt" />
      <YAxis domain={[minTemperatureF,maxTemperatureF]}/>
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey={(data)=>parseFloat(convertCelsiusToFahrenheit(data.temperatura))} stroke="#FF9B16" fill="#FF9B16" formatter={dataFormatterTemperatureF}/>
    </AreaChart>
    </ResponsiveContainer>
        </TabPanel>
      </TabPanels>
      </TabGroup>
  </Card>
  )
}

export default TemperatureChart