import Sortable from '@shopify/draggable/lib/sortable'

if (typeof window.livewire === 'undefined') {
    throw 'Livewire Sortable Plugin: window.livewire is undefined. Make sure @livewireScripts is placed above this script include'
}

window.livewire.directive('sortable-group', (el, directive, component) => {
    // Only fire this handler on the "root" directive.
    if (directive.modifiers.length > 0) return

    let options = { draggable: '[wire\\:sortable-group\\.item]' }

    if (el.querySelector('[wire\\:sortable-group\\.handle]')) {
        options.handle ='[wire\\:sortable-group\\.handle]'
    }

    const sortable = new Sortable(el.querySelectorAll('[wire\\:sortable-group\\.item-group]'), options);

    sortable.on('sortable:stop', () => {
        setTimeout(() => {
            let groups = []

            document.querySelectorAll('[wire\\:sortable-group\\.item-group]').forEach((el, index) => {
                let items = []
                el.querySelectorAll('[wire\\:sortable-group\\.item]').forEach((el, index) => {
                    items.push({ order: index + 1, value: el.getAttribute('wire:sortable-group.item')})
                })

                groups.push({
                    order: index + 1,
                    value: el.getAttribute('wire:sortable-group.item-group'),
                    items: items,
                })
            })

            component.call(directive.method, groups)
        }, 1)
    })
})

window.livewire.directive('sortable', (el, directive, component) => {
    // Only fire this handler on the "root" directive.
    if (directive.modifiers.length > 0) return

    let options = { draggable: '[wire\\:sortable\\.item]' }

    if (el.querySelector('[wire\\:sortable\\.handle]')) {
        options.handle ='[wire\\:sortable\\.handle]'
    }

    const sortable = new Sortable(el, options);

    sortable.on('sortable:stop', () => {
        setTimeout(() => {
            let items = []

            document.querySelectorAll('[wire\\:sortable\\.item]').forEach((el, index) => {
                items.push({ order: index + 1, value: el.getAttribute('wire:sortable.item')})
            })

            component.call(directive.method, items)
        }, 1)
    })
})
