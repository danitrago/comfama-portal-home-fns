const deliveryApi = require("contentful");
const { getFields } = require("./utils/getFields");

class ComfamaContenful {
  public constructor(private accessToken: string, private space: string) {}
  private deliveryClient = deliveryApi.createClient({
    accessToken: this.accessToken,
    space: this.space,
    resolveLinks: true,
    removeUnresolved: true
  });
  public getData = (
    entryId: string,
    contentType: string,
    select: string = "",
    depth: number = 4
  ) =>
    this.deliveryClient
      .getEntries({
        "sys.id": entryId,
        content_type: contentType,
        select: select,
        include: depth
      })
      .then((entry: any) => {
        return getFields(entry.items[0]);
      })
      .catch(console.error);
}

module.exports = ComfamaContenful;
