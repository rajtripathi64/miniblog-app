import { useEffect, useState } from 'react'

// Returns a "delayed echo" of `value` - it only updates once `value` has
// stopped changing for `delayMs`. Typing "raj_tripathi" produces many rapid
// changes to `value`, but this hook only emits the final settled value once
// typing pauses, which is the signal we actually want to react to.
function useDebounce(value, delayMs = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // Every time `value` changes, cancel whatever timer was running and
        // start a fresh one. If the value keeps changing faster than
        // `delayMs`, this timeout never gets the chance to fire.
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delayMs)

        // Cleanup: React runs this before the *next* effect call (i.e. the
        // next keystroke) or on unmount - this is what actually cancels the
        // stale timer instead of letting it pile up.
        return () => clearTimeout(timer)
    }, [value, delayMs])

    return debouncedValue
}

export default useDebounce