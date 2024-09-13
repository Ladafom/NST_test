import { useEffect, useState } from "react";

function useResponsive(breackpoints) {
  const [index, setIndex] = useState(0)

  useEffect(()=> {
    const updateIndex = ()=>{
      const width = window.innerWidth;
      const newIndex = breackpoints.findIndex(bp=> width <= bp)
      setIndex(newIndex === -1 ? breackpoints.length : newIndex)
    }

    updateIndex()
    window.addEventListener('resize', updateIndex)
  },[breackpoints])

  return index;
}

export default useResponsive;