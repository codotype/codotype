export const APP_EDITOR_TOUR = [
  // {
  //   element: '#project-header',
  //   popover: {
  //     title: 'Blueprint',
  //     description: 'A blueprint encapsulates a high-level representation of data',
  //     position: 'right'
  //   }
  // },
  // {
  //   element: '#project-edit-button',
  //   popover: {
  //     title: 'Edit Blueprint',
  //     description: 'Click here to edit your blueprint\'s name',
  //     position: 'bottom'
  //   }
  // },
  {
    element: '#model-list',
    popover: {
      title: 'Models',
      description: 'Models define the data described by your Blueprint',
      position: 'right'
    }
  },
  {
    element: '#user-model',
    popover: {
      title: 'User Model',
      description: 'All blueprints include a User model by default.<br/><br/>The User model requires username and email attributes',
      position: 'right'
    }
  },
  {
    element: '#new-model-button',
    popover: {
      title: 'Add Model',
      description: 'Click here to add a new Model to your Blurprint',
      position: 'right'
    }
  },
  {
    element: '#model-detail',
    popover: {
      title: 'Model Detiail',
      description: 'Models encapsulate Attributes & Relations',
      position: 'left'
    }
  },
  {
    element: '#attribute-detail',
    popover: {
      title: 'Attributes',
      description: 'Attributes describe individual fields belonging to a single Model.',
      position: 'left'
    }
  },
  {
    element: '#add-attribute-button',
    popover: {
      title: 'Add Attribute',
      description: 'Click here to add a new Attribute',
      position: 'left'
    }
  },
  {
    element: '#relation-detail',
    popover: {
      title: 'Relations',
      description: 'Relations describe the association between two different models.',
      position: 'left'
    }
  },
  {
    element: '#add-relation-button',
    popover: {
      title: 'Add Relation',
      description: 'Click here to add a new Relation',
      position: 'left'
    }
  }
  // {
  //   element: '#generate-button',
  //   popover: {
  //     title: 'Generate',
  //     description: 'Click here to generate code with this blueprint',
  //     position: 'left'
  //   }
  // }
]

export const GENERATOR_LIST_TOUR = [
  {
    element: '#generator-list',
    popover: {
      title: 'Generators',
      description: 'Generators take configurations and generate code.',
      position: 'top'
    }
  }
]

export const APP_LIST_TOUR = [
  {
    element: '#blueprint-header',
    popover: {
      title: 'Blueprints',
      description: 'Blueprints define a collection of data models accepted by a Codotype Generator.',
      position: 'right'
    }
  },
  {
    element: '#app-new-button',
    popover: {
      title: 'New Blueprint',
      description: 'Click here to create a new Blueprint',
      position: 'right'
    }
  },
  {
    element: '#example-blueprint-header',
    popover: {
      title: 'Example Blueprints',
      description: 'Clone an Example Blueprint as a starting point',
      position: 'right'
    }
  },
  {
    element: '#example-blueprint-todo_list',
    popover: {
      title: 'ToDo List Example',
      description: 'Lower complexity - organize Tasks, Lists, & Users.',
      position: 'top'
    }
  },
  {
    element: '#example-blueprint-textbook_library',
    popover: {
      title: 'Library Example',
      description: 'Lower complexity - organize Books, Inventory Items, & Users.',
      position: 'top'
    }
  },
  {
    element: '#example-blueprint-tweeter',
    popover: {
      title: 'Tweeter Example',
      description: 'Medium complexity - Tweets, Favorites, Follows, & Users.',
      position: 'top'
    }
  }
]

export const BUILD_TOUR = [
  {
    element: '#build-stage-header',
    popover: {
      title: 'Build',
      description: 'TODO TODO',
      position: 'right'
    }
  },
  {
    element: '#add-build-stage',
    popover: {
      title: 'Add Generator',
      description: 'TODO TODO',
      position: 'right'
    }
  },
  {
    element: '#build-stage-list',
    popover: {
      title: 'Build Stages',
      description: 'Each build can run multiple generators against a single blueprint',
      position: 'right'
    }
  },
  {
    element: '#build-readme-nav',
    popover: {
      title: 'Generator README.md',
      description: 'TODO - add copy to README tour',
      position: 'top'
    }
  },
  {
    element: '#build-global-options-nav',
    popover: {
      title: 'Global Options',
      description: 'TODO - add copy to GLOBAL OPTIONS tour',
      position: 'top'
    }
  },
  {
    element: '#build-model-options-nav',
    popover: {
      title: 'Model Options',
      description: 'TODO - add copy to MODEL OPTIONS tour',
      position: 'top'
    }
  },
  {
    element: '#build-remove-stage-btn',
    popover: {
      title: 'Remove Stage',
      description: 'You may remove a stage anytime - but your configuration will be lost!',
      position: 'left'
    }
  }
]
