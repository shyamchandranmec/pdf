riot.tag2('add-list-modal', '<div id="add-list" class="modal"> <div class="modal-content"> <h4>Add new list</h4> <input id="listName" placeholder="To do" name="listName" type="text" class="validate" maxlength="15" autofocus> </div> <div class="modal-footer"> <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat" onclick="{addList}">Add</a> </div> </div>', '', '', function(opts) {
        var self = this;
        this.addList = function(e){
            var name  = this.listName.value;
            self.parent.addList(name);
        }.bind(this)
});