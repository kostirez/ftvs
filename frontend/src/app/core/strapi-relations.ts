export type StrapiRelations =
  { connect: number[] } |
  { disconnect: number[] }

export type StrapiRelationsType = "connect" | "disconnect"

export function createRelation(type: StrapiRelationsType, ids: number[]): StrapiRelations {
  switch (type) {
    case "connect": {
      return {connect: ids}
    }
    case "disconnect": {
      return {disconnect: ids}
    }
  }
}
