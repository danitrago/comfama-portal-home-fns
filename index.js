"use strict";
const deliveryApi = require("contentful");
const { getFields } = require("./utils/getFields");
class ComfamaContenful {
    constructor(accessToken, space) {
        this.accessToken = accessToken;
        this.space = space;
        this.deliveryClient = deliveryApi.createClient({
            accessToken: this.accessToken,
            space: this.space,
            resolveLinks: true,
            removeUnresolved: true
        });
        this.getData = (entryId, contentType, select = "", depth = 4) => this.deliveryClient
            .getEntries({
            "sys.id": entryId,
            content_type: contentType,
            select: select,
            include: depth
        })
            .then((entry) => {
            return getFields(entry.items[0]);
        })
            .catch(console.error);
    }
}
module.exports = ComfamaContenful;
