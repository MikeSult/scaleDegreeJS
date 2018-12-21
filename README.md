# scaleDegreeJS
works with Tone.js to define melodies by using scale degrees of a key instead of note names.

This module uses the string sequence '1 2 3 4 5 6 7 8' to represent a major scale.  The chromatic scale 
can be represented using either 'b' or '#' sharp symbols.  

'1 #1 2 #2 3 4 #4 5 #5 6 #6 7 8'

and

'1 b2 2 b3 3 4 b5 5 b6 6 b7 7 8' 

represent the chromatic scale.

You can write a pattern for a bass line:

var scaleDegreeFormula = '2 4 6 4 5 4 3 2 1 2 3 5 8 7 5 3';

this is combined with a key and durations to create an complex array suitable for use with Tone.js

var root = 'A3';

var rhythmArray = ['4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n'];

var notesAndDurations =  makeMelody(scaleDegreeFormula, root, rhythmArray);

// returns:
// notesAndDuration[0] = ['B3','D4','F#4','E4','D4','C#4','B3','A3','B3','C#4','E4','A4','G#4','F#4','E4','C#4']

// notesAndDuration[1] = ['4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n'];
