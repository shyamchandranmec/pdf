riot.tag2('footer-button', '<div class="fixed-action-btn" style="bottom: 45px; right: 24px;" onclick=""> <a href="#add-list" class="right-align btn-floating btn-large waves-effect waves-light red add-list-modal-trigger"> <i class="material-icons">add</i> </a> </div>', '', '', function(opts) {

        this.on("mount", function () {
            $('.add-list-modal-trigger').leanModal({
                ready: function () {
                    $("#listName").focus();
                }
            });
        })
});
