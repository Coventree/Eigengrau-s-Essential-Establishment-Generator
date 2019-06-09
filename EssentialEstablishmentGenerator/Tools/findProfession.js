import { townData } from "../Town/js/townData"
import { fetchProfessionChance } from "../NPCGeneration/fetchProfessionChance"
import { findInContainer } from "./FindInContainer"

export function findProfession (town, npc, profession) {
  profession = profession || npc.dndClass || npc.profession
  if (!profession && npc.socialClass) { profession = fetchProfessionChance(town, npc) }
  console.groupCollapsed(`running findProfession; looking for a ${profession}`)
  console.log({
    town,
    npc,
    profession
  })
  if (Object.keys(townData.professions).includes(profession)) {
    console.log(`${profession} is defined!`)
    console.groupEnd()
    return townData.professions[profession]
  } else {
    console.log(`could not find it. Looking for synonyms...`)
    const find = findInContainer(townData.professions, `synonyms`, profession)
    if (typeof find !== `undefined`) {
      console.log(`Found a synonym!`)
      console.log({ find })
      console.groupEnd()
      return find
    } else {
      console.error(`${profession} not found!`)
      console.groupEnd()
      return townData.professions[`peasant`]
    }
  }
}
