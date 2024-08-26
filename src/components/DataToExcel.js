import React from 'react';
import * as XLSX from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const DataToExcel = ({ data, filename, sheetName }) => {
    const dataToExcel = () => {
        // Verificación
        if (!data || data.length === 0) {
            alert("No hay datos para exportar a Excel");
            return;
        }

        // Media de todos los campos
        const TotalTemperatures = data.reduce((total, { temperatura }) => parseFloat(total) + parseFloat(temperatura), 0) / data.length;
        const TotalHumiditys = data.reduce((total, {humedad_relativa}) => parseFloat(total) + parseFloat(humedad_relativa),0) / data.length;
        const TotalCO2 = data.reduce((total, {CO2}) => parseFloat(total) + parseFloat(CO2),0) / data.length;
        const TotalPluviometro = data.reduce((total, {pluviometro}) => parseFloat(total) + parseFloat(pluviometro),0) / data.length;
        const TotalHumedad_suelo = data.reduce((total, {humedad_suelo}) => parseFloat(total) + parseFloat(humedad_suelo),0) / data.length;

        // Campos a exportar
        const Fields = data.map(({ temperatura, humedad_relativa, CO2, pluviometro, humedad_suelo, createdAt }) => ({
            temperatura,
            humedad_relativa,
            CO2,
            pluviometro,
            humedad_suelo,
            createdAt
        }));

        // Encabezado de la hoja
        const header = ['Temperaturas (°C)', 'Humedades Relativas (%)', 'CO2 (mg)', 'Pluviometro (l/m2)', 'Humedad del suelo (%)', 'Fecha y hora de publicación'];

        // Combinación de datos y el encabezado
        const sheetData = [header, ...Fields.map(item => Object.values(item))];

        // Agregar la media de los datos al final de la hoja
        const TemperaturesRow = ['Porcentaje de temperatura registrada: ', (TotalTemperatures.toFixed(2)) + '%'];
        const HumidityRow = ['Porcentaje de humedad registrada: ', (TotalHumiditys.toFixed(2)) + '%'];
        const CO2Row = ['Porcentaje de CO2 registrada: ', (TotalCO2.toFixed(2)) + '%'];
        const PluviometroRow = ['Porcentaje de pluviometro registrado: ', (TotalPluviometro.toFixed(2)) + '%'];
        const Humedad_sueloRow = ['Porcentaje de humedad del suelo registrada: ', (TotalHumedad_suelo.toFixed(2)) + '%'];
        sheetData.push(TemperaturesRow, HumidityRow, CO2Row, PluviometroRow, Humedad_sueloRow);

        // Crear una nueva hoja de cálculo
        const ws = XLSX.utils.aoa_to_sheet(sheetData);

        // Crear un libro de trabajo
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Sheet 1');

        // Guardar el archivo Excel
        XLSX.writeFile(wb, filename || 'exported_data.xlsx');
    };

    return (
        <button className="btn btn-success" onClick={dataToExcel}>
            <i className="bi bi-cloud-arrow-down-fill"></i> Descargar datos
        </button>
    );
};

export default DataToExcel;