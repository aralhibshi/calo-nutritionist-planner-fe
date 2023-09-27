import { create } from "zustand"
import { ITableStore } from "../interfaces"

const useTableStore = create<ITableStore>((set) => ({
  height: 0,
  setHeight: (amount) => set({ height: amount }),
  setHeightCondition: (setHeight) => {
    const height = window.innerHeight

    if (height >= 700 && height <= 870) {
      setHeight(220)
    }
    if (height > 870 && height <= 900) {
      setHeight(315)
    }
    if (height > 900 && height <= 950) {
      setHeight(320)
    }
    if (height > 950 && height <= 1000) {
      setHeight(345)
    }
    if (height > 1000 && height <= 1050) {
      setHeight(370)
    }
    if (height > 1100 && height <= 1150) {
      setHeight(420)
    }
    if (height > 1150 && height <= 1200) {
      setHeight(435)
    }
    if (height > 1200 && height <= 1250) {
      setHeight(465)
    }
    if (height > 1250 && height <= 1300) {
      setHeight(480)
    }
    if (height > 1300 && height <= 1350) {
      setHeight(510)
    }
    if (height > 1350 && height <= 1400) {
      setHeight(530)
    }
    if (height > 1400 && height <= 1450) {
      setHeight(560)
    }
  }
}))

export default useTableStore;