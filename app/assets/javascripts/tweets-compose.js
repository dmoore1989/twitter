(function(){
  $.TweetsCompose = function(el){
    this.$el = $(el);
    this.bindEvents();

  }

  $.TweetsCompose.prototype.bindEvents = function(){
    this.$el.on("click", this.submit());
  }

  $.TweetsCompose.prototype.submit = function(){
    
  }

  $.fn.tweetsCompose = function(){
    return this.each (function(){
      new $.TweetsCompose(this);
    }
  };

}());
