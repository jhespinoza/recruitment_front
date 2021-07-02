<template>
  <div style="margin: 0 auto; width: 80%">
    <Toast />
    <Panel header="CRUD Products">
      <Menubar :model="items" />
      <br />
      <DataTable :value="products" :paginator="true" :rows="10" selectionMode="single" :selection.sync="selectedProduct" dataKey="id">
        <Column field="id" header="Id"></Column>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="flagActive" header="FlagActive"></Column>
      
      </DataTable>
    </Panel>
    <Dialog header="Productos" :visible.sync="displayModal" :modal="true">
      <span class="p-float-label">
        <InputText id="name" type="text" v-model="product.name" style="width: 100%" />
        <label for="name">Name</label>
      </span>
      <br />
      <span class="p-float-label">
        <InputText id="code" type="text" v-model="product.code" style="width: 100%" />
        <label for="color">Code</label>
      </span>
      <br />
      <span class="p-float-label">
        <InputText id="flagActive" type="text" v-model="product.flagActive" style="width: 100%" />
        <label for="code">FlagActive</label>
      </span>
      <template #footer>
        <Button label="Guardar" icon="pi pi-check" @click="save" />
        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import productService from "../service/ProductService";
export default {
  name: "CrudApp",
  data() {
    return {
      products: null,
      product: {
        id: null,
        name: null,
        flagActive:null,
        code: null
      },
      selectedProduct: {
        id: null,
        name: null,
        flagActive:null,
        code: null
        },
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          command: () => {
            
           this.showSaveModal();
          }
        },
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          command: () => {
            this.showEditModal();
            }
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
          command: () =>{
            this.delete();

          }
        },
        {
          label: "Refresh",
          icon: "pi pi-fw pi-refresh",
          command: () => {
            this.getAll();
          }
        }
      ],
      displayModal: false
    };
  },
  productService: null,
  created() {
    this.productService = new productService();
  },
  token: null,
  mounted() {
    this.getAll();
  },
  methods: {
    showSaveModal() {
      this.displayModal = true;
    },
    showEditModal(){
      this.product = this.selectedProduct;
      this.displayModal = true;
      },
    getAll() {
      this.productService.getAll().then(data => {
        this.products = data.data;
      });
    },
    
    save() {
      // var body = {
      //   'code': product.code,
      //   'name': product.name,
      //  'flagActive':product.flagActive 
      // }
            var body = {
        'code': 'UND',
        'name': 'Mi Unidad',
        'flagActive': 1
      };
      this.productService.save(JSON.stringify(body)).then(data => {
        if (data.status === 200) {
          this.displayModal = false;
          this.product = {
            code: null,
            name: null,
            flagActive: null,
          };
          this.getAll();
        }
      });
    },
    delete(){
      this.productService.delete(this.selectedProduct.id).then(data=>{
          if(data.status===200){
            this.$toast.add({
              severity:'success',
              summary: 'Congratulation!!',
              detail:'Product Delete ', 
              life: 3000
             });
             this.getAll();

          }

      });

      },
    closeModal() {
      this.displayModal = false;
    }
  }
};
</script>

<style>
</style>