import { TabGroup, TabList, Tab, TabPanel, TabPanels, Flex } from "@tremor/react";
import React, { useState, useEffect } from "react";
import OverallChart from "./OverallChart";
import CardBase from "./CardBase";
import Charts from "./Charts";
import url_data from "./Data";
import "bootstrap/dist/css/bootstrap.min.css";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dasboard = () => {
    const url = url_data + "/last";
    const [selectedView, setSelectedView] = useState(1)
    const [lastdata, setLastdata] = useState([])
    const [dataInitialLast, setDataInitialLast] = useState(false);
    var timerselected = 300000

    async function fetch_last_data() {
        await fetch(url).then(response => response.json()).then(resjson => {
            if ((resjson.data).length > 0) {
                setLastdata(resjson.data[0]);
                setDataInitialLast(true);
            }
        });
    }

    useEffect(() => {
        fetch_last_data();
        const interval = setInterval(() => {
            fetch_last_data()
            console.log('Se volvio a hacer la peticion de datos')
        }, timerselected);
        return () => clearInterval(interval);
    }, []);


    return (
        <main className="bg-slate-200 p-6 sm-:p-10" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
            <TabGroup>
                <nav className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"><i className="bi bi-list" style={{ fontSize: "35px", verticalAlign: "middle" }}></i> Menú principal</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <hr />
                            <div className="offcanvas-body">
                               
                                    <TabList defaultValue={selectedView} handleSelect={value => setSelectedView(value)}>
                                        <Flex>
                                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                            <li class="nav-item">
                                                <Tab value={1} style={{ fontWeight: 'bold', color: '#D5D5D5', fontSize: 20, marginBottom: 10 }}><i class="bi bi-arrow-right-square" style={{marginRight: 10}}></i><i className="bi bi-house-door-fill"></i> Home</Tab>
                                            </li>
                                            <li className="nav-item">
                                                <Tab value={2} style={{ fontWeight: 'bold', color: '#D5D5D5', fontSize: 20, marginBottom: 10 }}><i class="bi bi-arrow-right-square" style={{marginRight: 10}}></i><i className="bi bi-bar-chart-fill"></i> Gráficas</Tab>
                                            </li>
                                            </ul>
                                        </Flex>
                                    </TabList>
                              
                            </div>
                        </div>
                    </div>
                </nav>
                <TabPanels>
                    <TabPanel> {/*Pestaña 1*/}
                        {
                            dataInitialLast ?
                                <>
                                    <CardBase last_data={lastdata} /> {/*Componente CardBase */}
                                    <OverallChart overallchartdata={lastdata} /> {/*Componente de la grafica*/}
                                </>
                                :
                                <>
                                    <p style={{ color: "white" }}>Cargando datos...</p>
                                    <p style={{ color: "white" }}>Puede que no haya datos disponibles...</p>
                                </>
                        }
                    </TabPanel>
                    <TabPanel> {/*Pestaña 2*/}
                        {
                            dataInitialLast ?
                                <Charts />
                                :
                                <>
                                    <p style={{ color: "white" }}>Cargando datos...</p>
                                    <p style={{ color: "white" }}>Puede que no haya datos disponibles...</p>
                                </>
                        }
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </main>
    )
}

export default Dasboard