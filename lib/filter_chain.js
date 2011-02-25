/**
 * Filter chain 
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

const FILTERS_PATH = './filters/';

function FilterChain(filters) {
    if (!(this instanceof FilterChain)) return new FilterChain(filters);

    this.beforeFilters = loadFilters(filters.beforeUrlExpansionFilters);
    this.afterFilters = loadFilters(filters.afterUrlExpansionFilters);
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
    var i;

    for (i = 0; i < this.afterFilters.length; i++) {
        if (!this.afterFilters[i].accept(tweet)) {
            return;
        }
    }

    callback();
}

function loadFilters(filters) {
    var filterName, filter, loadedFilters = [];

    for (filterName in filters) {
        filter = require(FILTERS_PATH + filterName);
        loadedFilters.push(new filter(filters[filterName]));
    }

    return loadedFilters;
}
