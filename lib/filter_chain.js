/**
 * Filter chain 
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

const FILTERS_PATH = './filters/';

function FilterChain(filterConfigs) {
    if (!(this instanceof FilterChain)) return new FilterChain(filterConfigs);

    this.beforeFilters = this._loadFilters(filterConfigs.beforeUrlExpansionFilters);
    this.afterFilters = this._loadFilters(filterConfigs.afterUrlExpansionFilters);
}

exports.FilterChain = FilterChain;

FilterChain.prototype.accept = function (tweet, acceptanceCallback) {
    this._filterTweet(this.beforeFilters, tweet, acceptanceCallback);
}

FilterChain.prototype.acceptExpandedUrls = function (tweet, acceptanceCallback) {
    this._filterTweet(this.afterFilters, tweet, acceptanceCallback);
}

FilterChain.prototype._filterTweet = function (filters, tweet, acceptanceCallback) {
    var accepted = filters.every(function (filter) {
        return filter.accept(tweet);
    });

    if (accepted) {
        acceptanceCallback();
    }
}

FilterChain.prototype._loadFilters = function (filterConfigs) {
    var filterName, filter, loadedFilters = [];

    for (filterName in filterConfigs) {
        if (filterConfigs[filterName].enabled !== false) {
            filter = require(FILTERS_PATH + filterName);
            loadedFilters.push(new filter(filterConfigs[filterName]));
        }
    }

    return loadedFilters;
}
