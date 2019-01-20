const inputComponent = {
  template: `<input class="input is-small" type="text" :placeholder="placeholder" v-model="input" @keyup.enter="handleKeyUp"/>`,

  props: ['placeholder'],

  data() {
    return {
      input: ''
    }
  },

  methods: {
    handleKeyUp() {
      this.$emit('add-note', {
        note: this.input,
        timestamp: new Date().toLocaleString()
      });
      this.input = '';
    }
  }

}

new Vue({
  el: '#app',

  components: {
    'input-component': inputComponent
  },

  data: {
    notes: [],
    timestamps: [],
    placeholder: 'Название заметки'
  },

  methods: {
    addNote(evt) {
      this.notes.push(evt.note);
      this.timestamps.push(evt.timestamp);
      console.log('--->>', 'event', evt);
    }
  }

})
