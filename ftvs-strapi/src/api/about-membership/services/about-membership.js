'use strict';

/**
 * about-membership service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::about-membership.about-membership');
