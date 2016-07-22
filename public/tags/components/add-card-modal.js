riot.tag2('add-card-modal', '<div id="new-card-{opts.uid}" class="modal"> <div class="modal-content"> <h4>Add new task</h4> <input placeholder="Title goes here" name="title" type="text" class="validate" maxlength="50"> <textarea placeholder="Description......" name="content" class="materialize-textarea"></textarea> <input class="date-picker" name="dueDate" placeholder="Date of completion"> </div> <div class="modal-footer"> <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat" onclick="{addCard}">Add</a> </div> </div>', '', '', function(opts) {
        var self = this;
        this.on("mount",function () {
            $(this.root).find(".date-picker").pickadate({
                format:"yyyy-mm-dd"
            });

        })
        this.addCard = function(e) {
            if(this.dueDate.value.length == 0) {
                this.dateValue = null;
            } else {
                this.dateValue = this.dueDate.value
            }
            var data = {
                title : this.title.value,
                content :this.content.value,
                due_date: this.dateValue
            }
            if(data.title && data.title.length) {
                self.parent.addCard(data)
            }
        }.bind(this)
});