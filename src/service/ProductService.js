import axios from 'axios';


export default class PersonaService {

    
    url = "https://products2.makipos.la/";
   

   
    getAll() {
        return axios.get(this.url + "units");
    }

    save(body) {
        return axios.post(this.url + "units", body)
    }

    updateById(id){
        return axios.patch(this.url+"units/"+id)
      
    }

    deleteUnit(id){
        return axios.delete(this.url+"units/"+id)
    }
    deleteById(id){
        return axios.get(this.url + "units/"+id)
    }
    
}