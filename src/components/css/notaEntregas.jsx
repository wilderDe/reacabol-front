import { StyleSheet } from '@react-pdf/renderer';

const StyleNotaOrden = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: '20px'
  },

  section_1: {
    height: '74px',
    flexDirection:'row',
    justifyContent:'space-between',
  },

  /*+++++++++++++++++++++++++++++++++++++++++++++++++*/
  info_recabol:{
    width:'35%',
    justifyContent:'space-evenly',
  },
  info_recabol_logo:{
    width:'70%',
    alignSelf:'center'
  },
  info_recabol_texto:{
    fontSize:'8px',
    textAlign:'center',
  },
  /*+++++++++++++++++++++++++++++++++++++++++++++++++*/

  /*+++++++++++++++++++++++++++++++++++++++++++++++++*/
  nro_fecha:{
    justifyContent:'center',
    width:'20%',

    textAlign:'right',
    fontSize:'10px',
  },
  nro_orden_cont:{
    flexDirection:'row',
    alignSelf:'flex-end',
    color:'red'
  },

  fecha_cont:{
    flexDirection:'row',
    alignSelf:'flex-end'
  },
  /*+++++++++++++++++++++++++++++++++++++++++++++++++*/







/***********************************************************/
  section_2: {
    height: '40px',
    flexDirection:'row',
    justifyContent:'space-between',

    fontSize:'10px'
  },
  senior:{
    flexDirection:'row',
    alignItems:'center'
  },
  senior_datos:{
    justifyContent:'space-around'
  },  
  senior_datos_ref:{
    flexDirection:'row',
  },
/***********************************************************/



  section_3: {
    height: '280px',
    fontSize:'10px',
  },
  table_header:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:'26px',
    backgroundColor:'#FFC700',
    borderTopLeftRadius:'5px',
    borderTopRightRadius:'5px'
  },

  table_footer:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:'26px',
    backgroundColor:'#FFC700',
    borderBottomLeftRadius:'5px',
    borderBottomRightRadius:'5px'
  },
  
  table_data:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:'26px'
  },
  evenRow: {
    backgroundColor: '#f0f0f0',
  },
  oddRow: {
    backgroundColor: '#FDE0B4',
  },



  table_column_cant:{
    width:'50px',
    textAlign:'center',
    alignSelf:'center'
  },
  table_column_orden:{
    width:'50px',
    textAlign:'center',
    alignSelf:'center'
  },
  table_column_alfa:{
    width:'50px',
    textAlign:'center',
    alignSelf:'center'
  },
  table_column_marca:{
    width:'70px',
    alignSelf:'center'
  },
  table_column_medida:{
    width:'70px',
    alignSelf:'center'
  },
  table_column_serie:{
    width:'70px',
    alignSelf:'center'
  },
  table_column_trabajo:{
    width:'70px',
    alignSelf:'center'
  },
  table_column_total:{
    width:'70px',
    alignSelf:'center',
    textAlign:'center',
  },







/***********************************************************/
  section_4: {
    height: '43px',
    flexDirection:'row',
    fontSize:'10px',
    
  },
  lugar_entrega:{
    flexDirection:'row',
    width:'33%',
    alignSelf:'flex-end',
  },
  contratante:{
    width:'33%',
    textAlign:'center',
    alignSelf:'flex-end'
  },
  despachado_por_entrega:{
    width:'33%',
    textAlign:'center',
    alignSelf:'flex-end',
  }
/***********************************************************/
});

export default StyleNotaOrden;
