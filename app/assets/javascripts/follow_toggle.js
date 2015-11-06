(function () {
  $.FollowToggle = function (el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    if (this.$el.data("initial-follow-state")) {
      this.followState = "followed";
    }  else {
      this.followState = "unfollowed";
    }

    this.render();
    this.handleClick();
  };

  $.FollowToggle.prototype.render = function () {
    var text = this.followState === "followed" ? "Unfollow!" : "Follow!";
    this.$el.text(text);
  };

  $.FollowToggle.prototype.handleClick = function () {
    this.$el.on("click", function(event) {
      event.preventDefault();
      var type = (this.followState === "followed") ? "DELETE" : "POST"
      var context = this;
      $.ajax({
        type: type,
        url: "/users/"+ context.userId + "/follow",
        dataType: "json",
        success: function(data){
          context.followState = (context.followState === "followed") ? "unfollowed": "followed";
          context.render();
        },
        failure: function(data){
          console.log(data);
        }

      });
    }.bind(this));
  }

  $.fn.followToggle = function () {
    return this.each(function () {
      new $.FollowToggle(this);
    });
  };
}());
