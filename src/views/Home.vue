<template>
  <div class="row">
    <div class="col-12">
      <div class="card ">
        <div class="card-header text-uppercase">Direccionamiento</div>
        <div class="card-body">
          <div class="row row-cols-2">
            <div class="col-4">
              <div class="card">
                <div class="card-header text-uppercase">Desde - Hasta</div>
                <div class="card-body mt-1">
                  <div class="form-group">
                    <date-picker v-model="dates" range @close="handleChange"></date-picker>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-8">
              <div class="card">
                <div class="card-header text-uppercase">Descargar como</div>
                <div class="card-body text-center m-2">
                  <button type="button" class="btn btn-outline-secondary btn-same-w mr-3" @click="download('csv')">
                    <i class="fa fa-download"></i> CSV
                  </button>
                  <button type="button" class="btn btn-outline-secondary btn-same-w" @click="download('xlsx')">
                    <i class="fa fa-download"></i> XLSX
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';

export default {
  name: "Home",
  components: {DatePicker},
  data() {
    return {
      dates: [],
    };
  },
  methods: {
    getData() {
      const [start, end] = this.dates;
      return {
        startDate: this.$moment(start).format('YYYY-MM-DD'),
        endDate: this.$moment(end).format('YYYY-MM-DD')
      };
    },
    handleChange() {
      this.$store.dispatch("saveAddressing", this.getData()).then((response) => console.log(response));
    },
    download(extension) {
      console.log(extension);
      this.$store.dispatch("getAddressing", this.getData()).then((response) => console.log(response));
    }
  }
};
</script>
