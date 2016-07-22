riot.tag2('action-card', '<div class="{⁗action-card⁗: true, highlight: this.highlight}"> <b>{title}</b> <br> <div>{content} </div> <div> <br> <i class="tiny material-icons add-button">query_builder</i> <span class="date-field">{this.dueDate}</span></a> </div> <div id="{id}" class="modal"> <div class="modal-content"> <h4>Modal Header</h4> <p>A bunch of text</p> </div> <div class="modal-footer"> <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a> </div> </div> </div>', '', 'class="card white "', function(opts) {
            var today = moment().format("YYYY-MM-DD");
            if(!this.due_date) {
                this.highlight = false;
                this.dueDate = "No date selected";
            } else {
                this.dueDate = moment(this.due_date).format("YYYY-MM-DD");
                this.highlight = moment(this.dueDate).isBefore(today);
            }
});