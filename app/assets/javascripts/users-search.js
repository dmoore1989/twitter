(function(){
  $.UsersSearch = function(el) {
    this.$el = $(el);
    this.$input = this.$el.find("input")
    this.$ul = this.$el.find(".users")

    this.handleInput();
  }

  $.UsersSearch.prototype.handleInput = function(){
    this.$input.on("input", function(event){
      event.preventDefault();
      var query = $(event.currentTarget).val();

      var context = this;

      $.ajax({
        url: "/users/search",
        type: "GET",
        dataType: "json",
        data: {query: query},
        success: function(data) {
          context.renderResults(data);
          console.log(data);
        },
        failure: function(data) {
          console.log(data);
        },
      })
    }.bind(this));
  }

  $.UsersSearch.prototype.renderResults = function (data) {
    this.$ul.empty();
    $(data).each(function (idx, user) {
      var $li = $("<li>")
      var text = "<a href=\"/users/" + user.id + "\">" + user.username + "</a> "
      var $button = $("<button>")
      $button.followToggle({
        id: user.id,
        followState: user.followed
      })
      $li.html(text).append($button);
      this.$ul.append($li);
    }.bind(this));
  }

  $.fn.usersSearch = function(){
    return this.each(function (){
      new $.UsersSearch(this);
    });
  };
}());
