const EventBus = new Vue();
window.EventBus = EventBus;

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
      EventBus.$emit('add-note', {
        note: this.input,
        timestamp: new Date().toLocaleString()
      });
      this.input = '';
    }
  }
}

const noteCountComponent = {
  template: `<div class="note count">Всего заметок: <strong>{{ noteCount }}</strong></div>`,

  data() {
    return {
      noteCount: 0
    }
  },

  created() {
    EventBus.$on('add-note', evt => this.noteCount++);
  }
};

new Vue({
  el: '#app',

  components: {
    'input-component': inputComponent,
    'note-count-component': noteCountComponent
  },

  data: {
    notes: [],
    timestamps: [],
    placeholder: 'Название заметки'
  },

  created() {
    EventBus.$on('add-note', evt => {
      this.addNote(evt);
    })
  },

  computed: {
    noteCount() {
      return this.notes.length;
    }
  },

  methods: {
    addNote(evt) {
      this.notes.push(evt.note);
      this.timestamps.push(evt.timestamp);
      console.log('--->>', 'event', evt);
    }
  }

})
