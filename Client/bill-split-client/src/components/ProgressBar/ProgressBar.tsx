import React, { useState } from 'react'
import './ProgressBar.css'
import { StepStatus } from '../../types/types'

type ProgressParams = {
  steps:StepStatus,
  setSteps:(level:string) => void
}

const ProgressBar = (steps:ProgressParams) => {
  
  const goTo = (pageName:string) => {
    if(steps.steps[pageName] == 'done') {
      steps.setSteps(pageName)
    }
  }

  return (
    <div className='progress-bar-parent'>
        <div className="progress-bar-steps">
        <div onClick={() => goTo('bill-upload')} className={"step " + (steps.steps['bill-upload'])} data-desc="Bill Upload">1</div>
        <div onClick={() => goTo('add-contributers')} className={"step " + (steps.steps['add-contributers']) } data-desc="Add Contributers">2</div>
        <div onClick={() => goTo('item-user-map')} className={"step " + (steps.steps['item-user-map']) } data-desc="Item-User Assignment">3</div>
        <div onClick={() => goTo('final-split')} className={"step " + (steps.steps['final-split']) } data-desc="Final Split">4</div>
        </div>
    </div>
  )
}

export default ProgressBar