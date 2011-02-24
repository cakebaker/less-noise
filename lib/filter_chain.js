/**
 * Filter chain 
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

function FilterChain(filters) {
    if (!(this instanceof FilterChain)) return new FilterChain(filters);

    var filterName, filter;
    this.beforeFilters = [];

    for (filterName in filters.beforeUrlExpansionFilters) {
        filter = require('./filters/' + filterName);
        this.beforeFilters.push(new filter(filters.beforeUrlExpansionFilters[filterName]));
    }
}

exports.FilterChain = FilterChain;

FilterChain.prototype.accept = function (tweet, callback) {
    var i;

    for (i = 0; i < this.beforeFilters.length; i++) {
        if (!this.beforeFilters[i].accept(tweet)) {
            return;
        }
    }

    callback();
}

FilterChain.prototype.acceptExpandedUrls = function (tweet, callback) {
    // TODO implement function

    callback();
}
