import axios from 'axios';
import React, { useCallback, useState } from 'react';
import InputField from '../InputField';

interface IObjectForm {
  id: string;
  cep: string;
  localidade: string;
  uf: string;
  logradouro: string;
  bairro: string;
  complemento: string;
  ibge: string;
  siafi: string;
}

const api = process.env.REACT_APP_API_URL

const  ConsultaCEP: React.FC = () => {

 const [ form, setForm ] = useState<IObjectForm>({} as IObjectForm);
 const [ descricao, setDescricao ] = useState<string>('');
 const [ numero, setNumero ] = useState<string>(''); 

 const onBlurCEP = useCallback((event:any) => {
      const { value } = event.target;
      axios.get(`${api}/csp/buscacep/consulta/${value}`)
      .then((response) => {
        if(response.status === 200){
          const { message } = response.data
          setForm(message);
          console.log(response);
        }
         
      }).catch((error) => {
        console.log(error);
      })
      
 },[]); 

 const handleSubmit = useCallback((e:any) => {
    e.preventDefault();
    
    const params = {
       'descricao' : descricao,
       'cep': form.cep,
       'numero': numero,
       'complemento': form.complemento
    }

    axios.post(`${api}/csp/buscacep/cadastra/`,params)
    .then((res) => {
       console.log(res);
    }).catch((error) => {
      console.log(error);
    })

  },[descricao, form,  numero]);

 return (
   <div>
   <h3>Consulta CEP - Bplus IRIS-React</h3>
  <form onSubmit={handleSubmit}>
      <div className='row'>

      <div className='col-lg-12'>
         <InputField
            type="text"
            label="Descrição"
            name="descricao"
            placeholder="Informe uma descrição do endereço"
            handleChange={(e) => {setDescricao(e.target.value)}}
          />
      </div>

      </div>
      <div className='row'>
        <div className='col-lg-3'>
          <InputField
            type="number"
            label="CEP"
            name="cep"
            value={form.cep}
            placeholder="Informe o CEP"
            handleBlur={onBlurCEP}
          />
        </div>
        <div className='col-lg-7'>
          <InputField
          type="text"
          label="Cidade"
          name="localidade"
          placeholder="Informe a cidade"
          value={form.localidade}
          />
        </div>
        <div className='col-lg-2'>
          <InputField
            type="text"
            label="Estado"
            name="uf"
            placeholder="Informe o estado"
            value={form.uf}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6'>
            <InputField
              type="text"
              label="Logradouro"
              name="logradouro"
              placeholder="Informe o logradouro"
              value={form.logradouro}
            />
          </div>

          <div className='col-lg-2'>
            <InputField
              type="text"
              label="Número"
              name="numero"
              placeholder="Informe o número"
              handleChange={(e) => {setNumero(e.target.value)}}
            />
          </div>

          <div className='col-lg-4'>
            <InputField
              type="text"
              label="Bairro"
              name="bairro"
              placeholder="Informe o bairro"
              value={form.bairro}
            />
          </div>
      </div>

      <div className='row'>
         <div className='col-lg-6'>
            <InputField
              type="text"
              label="Complemento"
              name="complemento"
              placeholder="Informe o complemento"
              value={form.complemento}
            />
          </div>
          <div className='col-lg-3'>
            <InputField
              type="text"
              label="IBGE"
              name="ibge"
              value={form.ibge}
            />
          </div>
          <div className='col-lg-3'>
            <InputField
              type="text"
              label="Siafi"
              name="siafi"
              value={form.siafi}
            />
          </div>

      </div>
     
     <div className='row'>
       <div className='col-lg-3'>
          <button 
            type="submit" 
            className='btn btn-success'
            style={{width: '150px'}}
            >Salvar</button>
       </div>
      

     </div>
     
  </form>
  </div>
 );

}

export default ConsultaCEP;