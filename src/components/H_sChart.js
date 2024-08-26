import React from 'react'
import { Card, Title, Flex, Badge } from "@tremor/react";
import { Col } from 'reactstrap';
import img_suelo from '../img/analisis-de-suelos.png'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    StatusOnlineIcon
  } from "@heroicons/react/outline";

const dataFormatterSuelo = (number) => `${Intl.NumberFormat("us").format(number).toString()}%`

const H_SHumedad = ({ data }) => {
    const humedad = data.map(data => parseInt(data.humedad_suelo))
    const max_humedad = Math.max(...humedad) + 10;
    const min_humedad = 0;

    return (
        <Col>
            <Card className="max-w-lg" decoration="top" decorationColor="indigo">
                <Flex>
                    <Title>Gráfica humedades del suelo (%)</Title>
                    <Badge icon={StatusOnlineIcon}>LIVE</Badge>
                    <img
                        alt="humedad_suelo"
                        src={img_suelo}
                        style={{
                            height: 60,
                            widows: 60
                        }}
                    />
                </Flex>
                <ResponsiveContainer className="mt-8" width="100%" height={300}>
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="createdAt" />
                        <YAxis domain={[min_humedad, max_humedad]} />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="humedad_suelo" stroke="#6366f1" fill="#F1C40F" formatter={dataFormatterSuelo} />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        </Col>
    );
}

export default H_SHumedad;