import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';

let session = '';
let global_type; // guarda tipo do arquivo
// parametros de anonimizacao
const K = 2;
const M = 2;

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

/**
 * Pega um codigo de sessao do amnesia
 * @returns sessao
 */
export async function amnesiaGetSession() {
  // verifica se a sessao ja foi definida e retorna ela caso sim.
  if (session !== '') return session;

  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Cache-Control': 'no-cache',
  };

  try {
    session = await api
      .post('/getSession', { headers: headers })
      .then((response) => {
        console.log(response.data);
        return response.data.Session_Id;
      });
    return session;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Carrega um arquivo no amnesia para ser anonimizado
 
 * @param {*} e 
 * @param {string} filepath caminho do arquivo
 * @param {string} type  tipo do dataset (Sets of Values 'set' , 
                         Simple Table 'tabular', table with a set-valued attribute 'RelSet',
                         Disk based simple table 'Disk'). Os valores possiveis estao entre aspas ('')
 * @param {JSON} fields string JSON contendo os nomes dos campos e seus tipos.
                        Ex: { zipcode : int, age : int, gender : string }
 
 * @returns 
 */
export async function amnesiaLoadData(e, filepath, type, fields) {
  const data = new FormData();
  const session = await amnesiaGetSession();
  let del;
  console.log('pegando arquivo: ' + filepath);
  console.log(JSON.parse(fields));
  data.append('file', fs.createReadStream(filepath));

  global_type = type; // seta o valor global do tipo do arquivo

  type === 'set' ? (del = '|') : (del = ',');
  if (type === 'RelSet') data.append('delSet', '|');

  data.append('del', del);
  data.append('datasetType', type);
  data.append('columnsType', fields); //'{\n  "Procedure Codes": "set"\n}'

  const config = {
    url: '/loadData',
    method: 'post',
    headers: {
      Cookie: 'JSESSIONID=' + session,
      ...data.getHeaders(),
    },
    data: data,
  };

  const response = await api(config);
  return response.data;
}

/**
 * carrega as hierarquias no amnesia
 *
 * @param {*} e
 * @param {Array<string>} filepaths array contendo os caminhos dos
 *                                  arquivos de cada hierarquia.
 *                                  Ex: ['../file1.txt', '../file2.txt']
 * @returns
 */
export async function amnesiaLoadHierarquies(e, filepaths) {
  const data = new FormData();
  console.log('pegando arquivo: ' + filepaths);

  filepaths = Array(filepaths);
  filepaths.forEach((element) => {
    data.append('hierarquies', fs.createReadStream(element));
  });

  const session = await amnesiaGetSession();

  const config = {
    url: '/loadHierarchies',
    method: 'post',
    headers: {
      Cookie: 'JSESSIONID=' + session,
      ...data.getHeaders(),
    },
    data: data,
  };

  const response = await api(config);
  return response.data;
}

/**
 *
 * @param {*} e
 * @param {JSON} bind string JSON que indica a hierarquia a ser aplicada em cada campo
 *                    Ex: "{Procedure Codes : myNumHier,  age : age  }
 *                    Note que o primeiro valor de cada par representa o nome do
 *                    campo e o segundo representa o 'name' contido nos arquivos de
 *                    hierarquia.'
 */
export async function amnesiaAnonymization(e, bind) {
  const data = new FormData();
  const session = await amnesiaGetSession();
  console.log('Anonimiza');

  console.log(bind);
  data.append('bind', bind);

  // parametros de anonimizacao definidos nas variaveis globais K e M
  data.append('k', K.toString());
  if (global_type === 'RelSet' || global_type === 'set')
    data.append('m', M.toString());

  const config = {
    url: '/anonymization',
    method: 'post',
    headers: {
      Cookie: 'JSESSIONID=' + session,
      ...data.getHeaders(),
    },
    data: data,
  };

  const response = await api(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(JSON.stringfy(response.data));
  return response;
}
