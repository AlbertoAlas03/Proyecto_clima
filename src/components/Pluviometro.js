import React from 'react'
import { Card, Title, Flex, Badge } from "@tremor/react";
import { Col } from 'reactstrap';
import img_pluviometro from '../img/pluviometro.png'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    StatusOnlineIcon
} from "@heroicons/react/outline";


const dataFormatterPluviometro = (number) => `${Intl.NumberFormat("us").format(number).toString()}l/m2`

const Pluviometro = ({ data }) => {

    const p = data.map(data => parseInt(data.pluviometro))
    const max_p = Math.max(...p) + 10;
    const min_p = 0;

    return (
        <Col>
            <Card className="max-w-lg" decoration="top" decorationColor="teal">
                <Flex>
                    <Title>Gráfica pluviometro (l/m2)</Title>
                    <Badge icon={StatusOnlineIcon}>Live</Badge>
                    <img
                        alt="pluviometro"
                        src={img_pluviometro}
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
                        <YAxis domain={[min_p, max_p]} />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="pluviometro" stroke="#14b8a6" fill="#F1C40F" formatter={dataFormatterPluviometro} />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        </Col>
    )
}

export default Pluviometro;