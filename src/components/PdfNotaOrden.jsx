import React from 'react';
import { Page, Document, Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import StyleNotaOrden from './css/notaOrdens';
import logoRecabol from '../assets/logo.png'

const PDFNotaOrden = ({ notaOrden }) => (
  <Document>
    <Page size={[619, 477]} style={StyleNotaOrden.page}>

      <View style={StyleNotaOrden.section_1}>
        <View style={StyleNotaOrden.info_recabol}>
          <Image src={logoRecabol} style={StyleNotaOrden.info_recabol_logo} />
          <View>
            <Text style={StyleNotaOrden.info_recabol_texto}>
              RECAUCHUTADORA Y VULCANIZADORA DE LLANTAS
            </Text>
            <Text style={StyleNotaOrden.info_recabol_texto}>
              Av.  Circumvalación entre C. Beni y C. S/N. Zona Noreste
            </Text>
            <Text style={StyleNotaOrden.info_recabol_texto}>
              Telf. 5287714 - Cels. 72459881 -  72459882
            </Text>
            <Text style={StyleNotaOrden.info_recabol_texto}>
              Oruro - Bolivia
            </Text>
          </View>
        </View>

        <View style={StyleNotaOrden.nro_fecha}>
          <View>
            <Text style={StyleNotaOrden.nro_fecha_texto}>NOTA DE ÓRDEN</Text>
            <View style={StyleNotaOrden.nro_orden_cont}>
              <Text style={StyleNotaOrden.nro_orden_texto}>N-°</Text><Text style={StyleNotaOrden.nro_orden_dato}>{ notaOrden.numero_orden } </Text>
            </View>
            <View style={StyleNotaOrden.fecha_cont}>
              <Text style={StyleNotaOrden.fecha_cont_texto}>MIDAS:</Text><Text style={StyleNotaOrden.fecha_cont_dato}></Text>
            </View>
          </View>
        </View>
      </View>

      <View style={StyleNotaOrden.section_2}>

        <View style={StyleNotaOrden.senior}>
          <Text>Señor(es): </Text><Text>{ notaOrden.ref_neumatico[0].ref_cliente.nombre_apellidos } </Text>
        </View>

        <View style={StyleNotaOrden.senior_datos}>
          <View style={StyleNotaOrden.senior_datos_ref}>
            <Text>Ref:</Text><Text>{notaOrden.ref_neumatico[0].ref_cliente.celular} </Text>
          </View>
          <View style={StyleNotaOrden.senior_datos_lugar}>
            <Text>Lugar de Recepción:</Text><Text>{notaOrden.ref_sucursal.nombre} </Text>
          </View>
        </View>

      </View>

      <View style={StyleNotaOrden.section_3}>

        <View style={StyleNotaOrden.table_header}>
          <View style={StyleNotaOrden.table_column_cant}><Text>Cant.</Text></View>
          <View style={StyleNotaOrden.table_column_alfa}><Text>No. ALFA</Text></View>
          <View style={StyleNotaOrden.table_column_marca}><Text>Marca</Text></View>
          <View style={StyleNotaOrden.table_column_medida}><Text>Medida</Text></View>
          <View style={StyleNotaOrden.table_column_serie}><Text>Serie</Text></View>
          <View style={StyleNotaOrden.table_column_trabajo}><Text>Trabajo</Text></View>
          <View style={StyleNotaOrden.table_column_cotizacion}><Text>Cotización</Text></View>
        </View>

        {notaOrden.ref_neumatico.map((item, index) => (
          <View
            key={index}
            style={[
              StyleNotaOrden.table_data,
              index % 2 === 0 ? StyleNotaOrden.evenRow : StyleNotaOrden.oddRow,
            ]}
          >
            <View style={StyleNotaOrden.table_column_cant}>
              <Text>{index + 1}</Text>
            </View>
            <View style={StyleNotaOrden.table_column_alfa}>
              <Text>{item.alfa}</Text>
            </View>
            <View style={StyleNotaOrden.table_column_marca}>
              <Text>{item.marca}</Text>
            </View>
            <View style={StyleNotaOrden.table_column_medida}>
              <Text>{item.medida}</Text>
            </View>
            <View style={StyleNotaOrden.table_column_serie}>
              <Text>{item.serie}</Text>
            </View>
            <View style={StyleNotaOrden.table_column_trabajo}>
              <Text>{item.tipo_trabajo.nombre_trabajo}</Text>
            </View>
            <View style={StyleNotaOrden.table_column_cotizacion}>
              <Text>{item.tipo_trabajo.costo}</Text>
            </View>
          </View>
        ))},

      </View>

      <View style={StyleNotaOrden.section_4}>
        <View style={StyleNotaOrden.anticipo}>
          <Text style={StyleNotaOrden.anticipo_texto}>Anticipo: Bs.</Text><Text style={StyleNotaOrden.anticipo_dato}>{notaOrden.anticipo} </Text>
        </View>

        <View style={StyleNotaOrden.fecha_entrega}>
          <Text style={StyleNotaOrden.fecha_entrega_texto}>Fecha de Entrega: </Text><Text style={StyleNotaOrden.fecha_entrega_texto}></Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFNotaOrden;
