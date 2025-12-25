if (!String.prototype.capitalize) {
  String.prototype.capitalize = function () {
    if (!this.length) return "";
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
}

if (!String.prototype.slugify) {
  String.prototype.slugify = function () {
    if (!this.length) return "";
    return this.capitalize().trim().replace(/-/g, " ");
  };
}
