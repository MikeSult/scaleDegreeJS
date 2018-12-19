// 
// scaleDegree.js
//

// import {mergeDurationVelocityAndPitch} from '../PracticeRoom/Rhythm.js';
// to create documentation:
// %: cd ~/Documents/HTML/scaleDegreeJS
// %: documentation build scaleDegree.js -f html -o docs



/**
 * @overview This module is a IIFE (Immediately Invoked Function Expression) and
 * it returns a var with the name of scaleDegree.  This document contains its public API.
 * <br><br>This module uses the jazz method of describing a major scale: 1 2 3 4 5 6 7 8
 * and it uses # and b as modifiers.  They must be a string (not numbers) so that 
 * sharps (#) or flats (b) can be used to modify
 * <br>i.e. '1 b2 b3 4 5 b6 b7 8' represents a phrygian scale.
 * These patterns can be transposed to any starting location with a MIDI number offset.
 * The output of this library can be used with Tone.js to play notes and chords.
 * @example
 * <script src="scaleDegree.js"></script>
 *...
 * var myChordProg = scaleDegree.makeII_V_I_Major("A4")
 * var myBassline = scaleDegree.makeII_V_I_Major_WalkBass("A4")
 * these can be used with Tone.js 
 * 

 * @module scaleDegree.js
 * @returns {object} scaleDegree object
 */
var scaleDegree = (function() {

// Expanded to include chord extension terminolgy
var scaleDegreeToHalfSteps = {
    'b1' : -1,
    '1' : 0,
    '#1': 1,
    'b2': 1,
    'sus2': 2,
    '2': 2,
    '#2': 3,
    'b3': 3,
    '3': 4,
    '#3': 5,
    'b4': 4,
    'sus': 5,
    '4': 5,
    '#4': 6,
    'b5': 6,
    '5': 7,
    '#5': 8,
    'b6': 8,
    '6' : 9,
    '#6': 10,
    'd7': 9,
    'b7': 10,
    '7': 11,
    '#7': 12,
    'b8': 11,
    '8': 12,
    '#8': 13,
    'b9': 13,
    '9': 14,
    '#9': 15,
    'b10': 15,
    '10': 16,
    '#10': 17,
    'b11': 16,
    '11': 17,
    '#11': 18,
    'b12': 18,
    '12': 19,
    '#12': 20,
    'b13': 20,
    '13': 21,
    'b14': 22,
    '14': 23,
    '15': 24
};

var SHARP_NAMES = ['B#',  'C#', 'Cx',  'D#',  'E',  'E#',  'F#', 'Fx',  'G#', 'Gx',  'A#',  'B'];
var FLAT_NAMES =  ['C',   'Db', 'D',   'Eb',  'Fb', 'F',   'Gb', 'G',   'Ab', 'A',   'Bb',  'Cb'];
var OTHER_NAMES = ['Dbb', 'Bx', 'Ebb', 'Fbb', 'Dx', 'Gbb', 'Ex', 'Abb', 'Ab', 'Bbb', 'Cbb', 'Ax'];


var MIDI_SHARP_NAMES = ['B#_0',  'C#_1', 'Cx_1', 'D#_1',   'E_1',  'E#_1',  'F#_1', 'Fx_1',  'G#_1', 'Gx_1', 'A#_1', 'B_1',
                    'B#_1', 'C#0', 'Cx0', 'D#0', 'E0', 'E#0', 'F#0', 'Fx0', 'G#0', 'Gx0', 'A#0', 'B0',
                    'B#0', 'C#1', 'Cx1', 'D#1', 'E1', 'E#1', 'F#1', 'Fx1', 'G#1', 'Gx1', 'A#1', 'B1',
                    'B#1', 'C#2', 'Cx2', 'D#2', 'E2', 'E#2', 'F#2', 'Fx2', 'G#2', 'Gx2', 'A#2', 'B2',
                    'B#2', 'C#3', 'Cx3', 'D#3', 'E3', 'E#3', 'F#3', 'Fx3', 'G#3', 'Gx3', 'A#3', 'B3',
                    'B#3', 'C#4', 'Cx4', 'D#4', 'E4', 'E#4', 'F#4', 'Fx4', 'G#4', 'Gx4', 'A#4', 'B4',
                    'B#4', 'C#5', 'Cx5', 'D#5', 'E5', 'E#5', 'F#5', 'Fx5', 'G#5', 'Gx5', 'A#5', 'B5',
                    'B#5', 'C#6', 'Cx6', 'D#6', 'E6', 'E#6', 'F#6', 'Fx6', 'G#6', 'Gx6', 'A#6', 'B6',
                    'B#6', 'C#7', 'Cx7', 'D#7', 'E7', 'E#7', 'F#7', 'Fx7', 'G#7', 'Gx7', 'A#7', 'B7',
                    'B#7', 'C#8', 'Cx8', 'D#8', 'E8', 'E#8', 'F#8', 'Fx8', 'G#8', 'Gx8', 'A#8', 'B8',
                    'B#8', 'C#9', 'Cx9', 'D#9', 'E9', 'E#9', 'F#9', 'Fx9'];
                          

var MIDI_FLAT_NAMES = ['C_1', 'Db_1', 'D_1', 'Eb_1', 'Fb_1', 'F_1', 'Gb_1', 'G_1', 'Ab_1', 'A_1', 'Bb_1', 'Cb0',
                    'C0', 'Db0', 'D0', 'Eb0', 'Fb0', 'F0', 'Gb0', 'G0', 'Ab0', 'A0', 'Bb0', 'Cb1',
                    'C1', 'Db1', 'D1', 'Eb1', 'Fb1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'Cb2',
                    'C2', 'Db2', 'D2', 'Eb2', 'Fb2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'Cb3',
                    'C3', 'Db3', 'D3', 'Eb3', 'Fb3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'Cb4',
                    'C4', 'Db4', 'D4', 'Eb4', 'Fb4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'Cb5',
                    'C5', 'Db5', 'D5', 'Eb5', 'Fb5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'Cb6',
                    'C6', 'Db6', 'D6', 'Eb6', 'Fb6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'Cb7',
                    'C7', 'Db7', 'D7', 'Eb7', 'Fb7', 'F7', 'Gb7', 'G7', 'Ab7', 'A7', 'Bb7', 'Cb8',
                    'C8', 'Db8', 'D8', 'Eb8', 'Fb8', 'F8', 'Gb8', 'G8', 'Ab8', 'A8', 'Bb8', 'Cb9',
                    'C9', 'Db9', 'D9', 'Eb9', 'Fb9', 'F9', 'Gb9', 'G9'];
                    


var MIDI_OTHER_NAMES = ['Dbb_1', 'Bx_0', 'Ebb_1', 'Fbb_1', 'Dx_1', 'Gbb_1', 'Ex_1', 'Abb_1', 'Ab_1', 'Bbb_1', 'Cbb0', 'Ax_1',
                    'Dbb0', 'Bx_1', 'Ebb0', 'Fbb0', 'Dx0', 'Gbb0', 'Ex0', 'Abb0', 'Ab0', 'Bbb0', 'Cbb1', 'Ax0',
                    'Dbb1', 'Bx0', 'Ebb1', 'Fbb1', 'Dx1', 'Gbb1', 'Ex1', 'Abb1', 'Ab1', 'Bbb1', 'Cbb2', 'Ax1',
                    'Dbb2', 'Bx1', 'Ebb2', 'Fbb2', 'Dx2', 'Gbb2', 'Ex2', 'Abb2', 'Ab2', 'Bbb2', 'Cbb3', 'Ax2',
                    'Dbb3', 'Bx2', 'Ebb3', 'Fbb3', 'Dx3', 'Gbb3', 'Ex3', 'Abb3', 'Ab3', 'Bbb3', 'Cbb4', 'Ax3',
                    'Dbb4', 'Bx3', 'Ebb4', 'Fbb4', 'Dx4', 'Gbb4', 'Ex4', 'Abb4', 'Ab4', 'Bbb4', 'Cbb5', 'Ax4',
                    'Dbb5', 'Bx4', 'Ebb5', 'Fbb5', 'Dx5', 'Gbb5', 'Ex5', 'Abb5', 'Ab5', 'Bbb5', 'Cbb6', 'Ax5',
                    'Dbb6', 'Bx5', 'Ebb6', 'Fbb6', 'Dx6', 'Gbb6', 'Ex6', 'Abb6', 'Ab6', 'Bbb6', 'Cbb7', 'Ax6',
                    'Dbb7', 'Bx6', 'Ebb7', 'Fbb7', 'Dx7', 'Gbb7', 'Ex7', 'Abb7', 'Ab7', 'Bbb7', 'Cbb8', 'Ax7',
                    'Dbb8', 'Bx7', 'Ebb8', 'Fbb8', 'Dx8', 'Gbb8', 'Ex8', 'Abb8', 'Ab8', 'Bbb8', 'Cbb9', 'Ax8',
                    'Dbb9', 'Bx8', 'Ebb9', 'Fbb9', 'Dx9', 'Gbb9', 'Ex9', 'Abb9'];

var MIDI_CLASS = {
    "B#": 0, "C": 0, "Dbb": 0, "C#": 1, "Bx": 1, "Db": 1, "Cx": 2, "D": 2, 
      "Ebb": 2, "D#": 3, "Eb": 3, "Fbb": 3, "Dx": 4,"E": 4, "Fb": 4, 
        "E#": 5, "F": 5, "Gbb": 5, "Ex": 6, "F#": 6, "Gb": 6, "Fx": 7, 
          "G": 7, "Abb": 7, "G#": 8, "Ab": 8, "Gx": 9, "A": 9, "Bbb": 10, 
            "A#": 10, "Bb": 10, "Cbb": 10, "Ax": 11, "B": 11, "Cb": 11
    };

// scale patterns
major_pattern = '1 2 3 4 5 6 7 8';
nat_minor_pattern = '1 2 b3 4 5 b6 b7 8';
harm_minor_pattern = '1 2 b3 4 5 b6 7 8';
mel_minor_pattern = '1 2 b3 4 5 6 7 8';

ionian = '1 2 3 4 5 6 7 8';
dorian = '1 2 b3 4 5 6 b7 8';
phrygian = '1 b2 b3 4 5 b6 b7 8';
lydian = '1 2 3 #4 5 6 7 8';
mixolydian = '1 2 3 4 5 6 b7 8';
aeolian = '1 2 b3 4 5 b6 b7 8';
locrian = '1 b2 b3 4 b5 b6 b7 8';

rel_dorian = '2 3 4 5 6 7 8 9';
rel_phrygian = '3 4 5 6 7 8 9 10';
rel_lydian = '4 5 6 7 8 9 10 11';
rel_mixolydian = ',5 ,6 ,7 1 2 3 4 5';
rel_aeolian = ',6 ,7 1 2 3 4 5 6';
rel_locrian = ',7 1 2 3 4 5 6 7';

min_pentatonic = '1 b3 4 5 b7 8';
maj_pentatonic = '1 2 3 5 6 8';
min_blues = '1 b3 4 b5 5 b7 8';
maj_blues = '1 2 b3 3 5 6 8';


var octaveUp = 'u';
var octaveDown = ','


// walking basslines
var DomWalkPattern2bars_v1 = '1 3 5 6 8 6 5 3';
var DomWalkPattern2bars_v2 = '1 3 5 6 b7 6 5 3';
var DomWalkPattern2bars_v3 = '8 b7 6 b6 5 4 b3 3';
var DomWalkPattern2bars_v4 = '1 8 b7 5 1 5 4 3';
var DomWalkPattern2bars_v5 = '1 3 4 #4 5 4 b3 2';

var DomWalkPattern1bar_v1 = '1 8 b7 5';
var DomWalkPattern1bar_v2 = '1 2 b3 3';
var DomWalkPattern1bar_v3 = '1 3 4 5';
var DomWalkPattern1bar_v4 = '1 3 5 6';

var BluesTurnaround_v1 = '1 b7 6 b6 5 4 b3 2';
var BluesTurnaround_v2 = '1 b7 6 b6 5 b3 2 b2';
var BluesTurnaround_v3 = '1 3 4 #4 5 6 b7 7';
var BluesTurnaround_v4 = '1 b7 6 b3 2 b6 5 b2';
// preceeding comma i.e. ',8' means an octave lower
var BluesTurnaround_v5 = '1 #5 6 #1 2 #4 5 '+octaveDown+'7'; 

// chord voicings
var Dom9_v1 = '1 3 b7 9 12';
var Dom9_v2 = '1 3 b7 9';
var Dom9_v3 = '3 b7 9 12';
var Dom9_v4 = 'b7 10 12 15';

var Dom13_v1 = '1 b7 10 13';
var Dom13_v2 = 'b7 10 13 15';
var Dom13_v3 = '3 b7 9 13';
var Dom13_v4 = 'b7 10 13';
// preceeding u i.e. 'u9' means an octave higher
var Dom13_v4 = 'b7 10 13 '+octaveUp+'9';

var II_V_I_MAJOR_WALKBASS = [
    '2 4 6 4 5 4 3 2 1 2 3 5 8 7 5 3',
    '2 1 ,7 ,6 ,5 ,6 ,b7 ,7 1 2 b3 3 1 ,7 ,6 ,5',
    '2 3 4 #4 5 6 b7 7 8 7 6 5 4 3 2 1',
    '2 1 ,7 ,6 ,5 4 3 2 1 ,7 ,6 ,5 ,6 3 2 1',
    '2 4 6 b6 5 4 2 ,7 1 3 5 4 3 2 1 3'
];

var II_V_I_MINOR_WALKBASS = [
    '2 4 b6 4 5 4 b3 2 1 2 b3 5 8 5 4 b3',
    '2 4 5 b6 5 4 b3 2 1 b3 5 4 b3 2 1 ,5',
    '2 b3 4 #4 5 6 b7 7 8 b7 b6 5 4 b3 2 1',
    '2 1 ,b7 ,b6 ,5 4 b3 2 1 ,5 1 2 b3 5 4 b3',
    '2 4 b6 #4 5 4 2 ,7 1 b3 5 4 b3 2 1 b3'
];

function getRandom(low, high) {
  diceMin = Math.ceil(low);
  diceMax = Math.floor(high);
  return Math.floor(Math.random() * (diceMax - diceMin + 1)) + diceMin; //The maximum is inclusive and the minimum is inclusive 
};


//------------------------------------
// I-V-I progression templates
// major key
/**
 * this function creates a II-V-I voicing in major
 * @public
 * @param {string} key 
 * @param {string} optionalStartTime
 * @param {string} optionalRhythm
 * @param {string} optionalVoicing
 * @returns {object} array used with Tone.js to play chord progression
 */
function makeII_V_I_Major(key, optionalStartTime, optionalRhythm, optionalVoicing) {
	var chordRhythm;
	var myStartTime;
	var chordProg;
	if(optionalStartTime == undefined)
		myStartTime = "0";
	else
		myStartTime = optionalStartTime.toString();

    // choose one:
    var whichVoicing = getRandom(0,2);
    if(whichVoicing == 0) {
        chordProg = scaleDegree.II_V_I_MAJOR_v1(key);
    } else if(whichVoicing == 1) {
        chordProg = scaleDegree.II_V_I_MAJOR_v2(key);
    } else {
        chordProg = scaleDegree.II_V_I_MAJOR_v3(key);
    }

	if(optionalRhythm == undefined) {
        chordRhythm = ['2n+4n','8n','|','8n+4n','8nr','8n','2nr','|','4n','8nr','8n','2nr','2n+4n','4nr'];
    } else {
        chordRhythm = optionalRhythm;
    }

	var rhythmAndChords = makeRhythmAndChordProg(chordRhythm, chordProg);	
	var notesAndRhythm = Rhythm.mergeDurationVelocityAndPitch(rhythmAndChords[0], rhythmAndChords[1], 0, myStartTime);
    return notesAndRhythm;
}

/**
 * this function creates a II-V-I voicing in minor
 * @public
 * @param {string} key 
 * @param {string} optionalStartTime
 * @param {string} optionalRhythm
 * @param {string} optionalVoicing
 * @returns {object} array used with Tone.js to play chord progression
 */
function makeII_V_I_Minor(key, optionalStartTime, optionalRhythm, optionalVoicing) {
	var chordRhythm;
	var myStartTime;
	var chordProg;
	if(optionalStartTime == undefined)
		myStartTime = "0";
	else
		myStartTime = optionalStartTime.toString();

    // choose one:
    var whichVoicing = getRandom(0,2);
    if(whichVoicing == 0) {
        chordProg = scaleDegree.II_V_I_MINOR_v1(key);
    } else if(whichVoicing == 1) {
        chordProg = scaleDegree.II_V_I_MINOR_v2(key);
    } else {
        chordProg = scaleDegree.II_V_I_MINOR_v3(key);    
    }

	if(optionalRhythm == undefined) {
        chordRhythm = ['2n+4n','8n','|','8n+4n','8nr','8n','2nr','|','4n','8nr','8n','2nr','2n+4n','4nr'];
    } else {
        chordRhythm = optionalRhythm;
    }

	var rhythmAndChords = makeRhythmAndChordProg(chordRhythm, chordProg);	
	var notesAndRhythm = Rhythm.mergeDurationVelocityAndPitch(rhythmAndChords[0], rhythmAndChords[1], 0, myStartTime);
    return notesAndRhythm;
}

/**
 * this function creates a II-V-I voicing array in major
 * @public
 * @param {string} key 
 * @returns {string} array of [name, root, voicing] for each of the II V and I chords
 */
function II_V_I_MAJOR_v1(key) {
//    var IChordRootOctave = '3';
//    var IIChordRootOctave = '3';
//    var VChordRootOctave = '3';
    var IChordRootOctave = '2';
    var IIChordRootOctave = '2';
    var VChordRootOctave = '2';
    if( key.includes('C') || key.includes('D') || key.includes('E') ) {
        IChordRootOctave = '3';
        IIChordRootOctave = '3';
        VChordRootOctave = '2';      
    } else if( key.includes('B') ) {
        IChordRootOctave = '2';
        IIChordRootOctave = '3';
        VChordRootOctave = '2'
    } else if( key.includes('A') ) {
        IChordRootOctave = '2';
        IIChordRootOctave = '2';
        VChordRootOctave = '2'
    }
	var voicingArray = [[getRoot(key, '2')+'m7', getRoot(key, '2')+IIChordRootOctave, '1 b3 b7 9'], [getRoot(key, '5')+'7', getRoot(key, '5')+VChordRootOctave, '1 b7 3 13'], [getRoot(key, '1')+'ma7', getRoot(key, '1')+IChordRootOctave, '1 3 7 9']];
	
	return voicingArray;
}

/**
 * this function creates a II-V-I voicing array in major
 * @public
 * @param {string} key 
 * @returns {string} array of [name, root, voicing] for each of the II V and I chords
 */
function II_V_I_MAJOR_v2(key) {
//    var IChordRootOctave = '3';
//    var IIChordRootOctave = '3';
//    var VChordRootOctave = '3';
    var IChordRootOctave = '2';
    var IIChordRootOctave = '2';
    var VChordRootOctave = '2';
    if( key.includes('C') || key.includes('D') || key.includes('E') ) {
        IChordRootOctave = '3';
        IIChordRootOctave = '3';
        VChordRootOctave = '2';      
    } else if( key.includes('B') ) {
        IChordRootOctave = '2';
        IIChordRootOctave = '3';
        VChordRootOctave = '2'
    } else if( key.includes('A') ) {
        IChordRootOctave = '2';
        IIChordRootOctave = '2';
        VChordRootOctave = '2'
    }
	var voicingArray = [[getRoot(key, '2')+'m7', getRoot(key, '2')+IIChordRootOctave, '1 b7 b3 5'], [getRoot(key, '5')+'7', getRoot(key, '5')+VChordRootOctave, '8 3 b7 9'], [getRoot(key, '1')+'ma7', getRoot(key, '1')+IChordRootOctave, '1 7 3 5']];
	
	return voicingArray;
}

/**
 * this function creates a II-V-I voicing array in major
 * @public
 * @param {string} key 
 * @returns {string} array of [name, root, voicing] for each of the II V and I chords
 */
function II_V_I_MAJOR_v3(key) {
//    var IChordRootOctave = '3';
//    var IIChordRootOctave = '3';
//    var VChordRootOctave = '3';
    var IChordRootOctave = '2';
    var IIChordRootOctave = '2';
    var VChordRootOctave = '2';
    if( key.includes('C') || key.includes('D') || key.includes('E') ) {
        IChordRootOctave = '3';
        IIChordRootOctave = '3';
        VChordRootOctave = '2';      
    } else if( key.includes('B') ) {
        IChordRootOctave = '2';
        IIChordRootOctave = '3';
        VChordRootOctave = '2'
    } else if( key.includes('A') ) {
        IChordRootOctave = '2';
        IIChordRootOctave = '2';
        VChordRootOctave = '2'
    }
	var voicingArray = [[getRoot(key, '2')+'m7', getRoot(key, '2')+IIChordRootOctave, '1 5 b7 b3'], [getRoot(key, '5')+'7', getRoot(key, '5')+VChordRootOctave, '1 8 3 b7'], [getRoot(key, '1')+'ma7', getRoot(key, '1')+IChordRootOctave, '1 5 7 3']];
	
	return voicingArray;
}

// minor key
/**
 * this function creates a II-V-I voicing array in minor
 * @public
 * @param {string} key 
 * @returns {string} array of [name, root, voicing] for each of the II V and I chords
 */
function II_V_I_MINOR_v1(key) {
    var IChordRootOctave = '3';
    var IIChordRootOctave = '3';
    var VChordRootOctave = '3';
    if( key.includes('C') || key.includes('D') || key.includes('E') ) {
        IChordRootOctave = '3';
        IIChordRootOctave = '3';
        VChordRootOctave = '2';      
    } else if( key.includes('B') ) {
        IChordRootOctave = '2';
        IIChordRootOctave = '3';
        VChordRootOctave = '2'
    } else if( key.includes('A') ) {
        IChordRootOctave = '2';
        IIChordRootOctave = '2';
        VChordRootOctave = '2'
    }
	var voicingArray = [[getRoot(key, '2')+'m7b5', getRoot(key, '2')+IIChordRootOctave, '1 b5 b7 b3'], [getRoot(key, '5')+'7', getRoot(key, '5')+VChordRootOctave, '1 b7 3 b13'], [getRoot(key, '1')+'mi6', getRoot(key, '1')+IChordRootOctave, '1 b3 6 9']];
	
	return voicingArray;
}

/**
 * this function creates a II-V-I voicing array in minor
 * @public
 * @param {string} key 
 * @returns {string} array of [name, root, voicing] for each of the II V and I chords
 */
function II_V_I_MINOR_v2(key) {
    var IChordRootOctave = '3';
    var IIChordRootOctave = '3';
    var VChordRootOctave = '3';
    if( key.includes('C') || key.includes('D') || key.includes('E') ) {
        IChordRootOctave = '3';
        IIChordRootOctave = '3';
        VChordRootOctave = '2';      
    } else if( key.includes('B') ) {
        IChordRootOctave = '2';
        IIChordRootOctave = '3';
        VChordRootOctave = '2'
    } else if( key.includes('A') ) {
        IChordRootOctave = '2';
        IIChordRootOctave = '2';
        VChordRootOctave = '2'
    }
	var voicingArray = [[getRoot(key, '2')+'m7b5', getRoot(key, '2')+IIChordRootOctave, '1 b7 b3 b5'], [getRoot(key, '5')+'7', getRoot(key, '5')+VChordRootOctave, '8 3 b7 b9'], [getRoot(key, '1')+'mi6', getRoot(key, '1')+IChordRootOctave, '1 6 b3 5']];
	
	return voicingArray;
}

/**
 * this function creates a II-V-I voicing array in minor
 * @public
 * @param {string} key 
 * @returns {string} array of [chordName, root, voicing] for each of the II V and I chords
 */
function II_V_I_MINOR_v3(key) {
//    var IChordRootOctave = '3';
//    var IIChordRootOctave = '3';
//    var VChordRootOctave = '3';
    var IChordRootOctave = '2';
    var IIChordRootOctave = '2';
    var VChordRootOctave = '2';
    if( key.includes('C') || key.includes('D') || key.includes('E') ) {
        IChordRootOctave = '3';
        IIChordRootOctave = '3';
        VChordRootOctave = '2';      
    } else if( key.includes('B') ) {
        IChordRootOctave = '2';
        IIChordRootOctave = '3';
        VChordRootOctave = '2'
    } else if( key.includes('A') ) {
        IChordRootOctave = '2';
        IIChordRootOctave = '2';
        VChordRootOctave = '2'
    }
	var voicingArray = [[getRoot(key, '2')+'m7', getRoot(key, '2')+IIChordRootOctave, '1 b5 b7 b3'], [getRoot(key, '5')+'7', getRoot(key, '5')+VChordRootOctave, '1 8 3 b7'], [getRoot(key, '1')+'ma7', getRoot(key, '1')+IChordRootOctave, '1 5 6 b3']];
	
	return voicingArray;
}

/**
 * this function creates a II-V-I walking bassline in major
 * @public
 * @param {string} key 
 * @param {string} optionalStartTime
 * @param {string} optionalRhythm
 * @param {string} optionalScaleDegrees
 * @returns {object} array used with Tone.js to play walking bass pattern
 */
function makeII_V_I_Major_WalkBass(key, optionalStartTime, optionalRhythm, optionalScaleDegrees) {
    var basslineRootOctave = '3';
    var bassScaleDegrees;
    var bassRhythm;
	var myStartTime;
	if(optionalStartTime == undefined)
		myStartTime = "0";
	else
		myStartTime = optionalStartTime.toString();
	if(optionalRhythm == undefined) {
        bassRhythm = ['4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n'];
	} else {
	    bassRhythm = optionalRhythm;
	}
	
	var upperLimit = II_V_I_MAJOR_WALKBASS.length-1;
	if(optionalScaleDegrees == undefined) {
        bassScaleDegrees = II_V_I_MAJOR_WALKBASS[getRandom(0, upperLimit)];
	} else {
	    bassScaleDegrees = optionalScaleDegrees;
	}
	console.log(bassScaleDegrees);
//    var bass = scaleDegree.makeFreqArray(bassScaleDegrees, key+basslineRootOctave);
    var bass = scaleDegree.makeNoteArray(bassScaleDegrees, key+basslineRootOctave);
    var myBass = Rhythm.mergeDurationVelocityAndPitch(bassRhythm, bass, 0, myStartTime);
    return myBass;
}

/**
 * this function creates a II-V-I walking bassline in minor
 * @public
 * @param {string} key 
 * @param {string} optionalStartTime
 * @param {string} optionalRhythm
 * @param {string} optionalScaleDegrees
 * @returns {object} array used with Tone.js to play walking bass pattern
 */
function makeII_V_I_Minor_WalkBass(key, optionalStartTime, optionalRhythm, optionalScaleDegrees) {
    var basslineRootOctave = '3';
    var bassScaleDegrees;
    var bassRhythm;
	var myStartTime;
	if(optionalStartTime == undefined)
		myStartTime = "0";
	else
		myStartTime = optionalStartTime.toString();
	if(optionalRhythm == undefined) {
        bassRhythm = ['4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n','4n'];
	} else {
	    bassRhythm = optionalRhythm;
	}
	var upperLimit = II_V_I_MINOR_WALKBASS.length-1;
	if(optionalScaleDegrees == undefined) {
        bassScaleDegrees = II_V_I_MINOR_WALKBASS[getRandom(0, upperLimit)];
	} else {
	    bassScaleDegrees = optionalScaleDegrees;
	}
//    var bass = scaleDegree.makeFreqArray(bassScaleDegrees, key+basslineRootOctave);
    var bass = scaleDegree.makeNoteArray(bassScaleDegrees, key+basslineRootOctave);
    var myBass = Rhythm.mergeDurationVelocityAndPitch(bassRhythm, bass, 0, myStartTime);
    return myBass;
}

//---------------------------------------*/

/**
 * this function translates a note name to a MIDI number
 * @private
 * @param {string} noteName
 * @returns {number} MIDI number of the note name
 */
function noteNameToMIDI(noteName)  {
    var i;
    var MIDInumber = -1; // default if not found
    for(i=0; i < MIDI_SHARP_NAMES.length; i++) {
        if( noteName == MIDI_SHARP_NAMES[i] ||
                noteName == MIDI_FLAT_NAMES[i] ||
                    noteName == MIDI_OTHER_NAMES[i] ) {
        
            MIDInumber = i;  // found it
            break;
        }
    }
    return MIDInumber;
}
var ALPHA_NAMES = ['A','B','C','D','E','F','G'];

/**
 * this function finds the index of the letter name in the ALPHA_NAMES arrayOfNotes
 * @private
 * @param {string} letter
 * @returns {number} index of the letter in the ALPHA_NAMES array, -1 if not found
 */
function findAlphaIndex(letter) {
    // look for letter in ALPHA_NAMES
    var i;
    for (i=0; i<ALPHA_NAMES.length; i++)
       if ( letter == ALPHA_NAMES[i] )
           return i;
    // didn't find it
    return -1; 
}

/**
 * this function create an alpha list with the rootName as it's first element
 * @private
 * @param {string} rootName
 * @returns {string} alpha_list with the rootName as the first element
 */
function makeAlphaList(rootName) {
    // This function reorders the ALPHA_NAMES list so that rootName is the first element
    var i = 0;
    var letter = rootName[0];
//    console.log('makeAlphaList(): rootName='+rootName);
    var startIndex = findAlphaIndex(letter);
    if (startIndex < 0)
        console.log("startIndex < 0"); 
    var newList = [];
    var index = startIndex;
    for (i=0; i<ALPHA_NAMES.length; i++) {
//        newList.push(ALPHA_NAMES[index+i % ALPHA_NAMES.length]);
        if ( index+i > 6 )
            index = index - 7;
        newList.push(ALPHA_NAMES[index+i]);

    }
    newList.push(ALPHA_NAMES[startIndex]);
    return newList;
}

/**
 * this function creates an alpha list from scaleDegrees and root
 * @private
 * @param {string} scaleDegrees
 * @param {string} root
 * @returns {string} alpha list
 */
function makeAlphaListFromFormula(scaleDegrees, root) {
    var i = 0;
    var oneScaleDegree;
    var letter = root[0];
//    console.log('makeAlphaListFromFormula(): root='+root);
    var startIndex = findAlphaIndex(letter);
    if (startIndex < 0)
        console.log("startIndex < 0"); 
    var newList = [];
    var index = startIndex;
    for (i=0; i<scaleDegrees.length; i++) {
        if ( (scaleDegrees[i].includes('b') || scaleDegrees[i].includes('#'))
            && (scaleDegrees[i].includes(',') || scaleDegrees[i].includes('u')) ) {
                oneScaleDegree = scaleDegrees[i].slice(2);              
        } else if ( scaleDegrees[i].includes('b') || scaleDegrees[i].includes('#')) {
            oneScaleDegree = scaleDegrees[i].slice(1);
        } else if ( scaleDegrees[i].includes(',') || scaleDegrees[i].includes('u')) {
            oneScaleDegree = scaleDegrees[i].slice(1);
        } else {
            oneScaleDegree = scaleDegrees[i].slice();
        }
/*------------------------------
//        newList.push(ALPHA_NAMES[(index + Number(oneScaleDegree)-1) % ALPHA_NAMES.length]);
        if ( (index + Number(oneScaleDegree)-1) > 6 ) {
            index = index - 7;
        } else if( index < 0) {
        // what to do?
        }
//------------------------------------*/
//        console.log('(index + Number(oneScaleDegree)-1) % ALPHA_NAMES.length='+(index + Number(oneScaleDegree)-1) % ALPHA_NAMES.length);
        newList.push(ALPHA_NAMES[(index + Number(oneScaleDegree)-1) % ALPHA_NAMES.length]);

    }
    newList.push(ALPHA_NAMES[startIndex]);
    return newList;

}

/**
 * this function creates an alpha list from scaleDegree and root
 * @private
 * @param {string} scaleDegree
 * @param {string} root
 * @returns {string} alpha list
 */
function makeAlphaLetterFromFormula(scaleDegree, root) {
    var i = 0;
    var oneScaleDegree;
    var letter = root[0];
//    console.log('makeAlphaLetterFromFormula(): root='+root);
    var startIndex = findAlphaIndex(letter);
    if (startIndex < 0)
        console.log("startIndex < 0"); 
    var alphaLetter = '';

//-------------------------------
    var index = startIndex;
        if ( (scaleDegree.includes('b') || scaleDegree.includes('#'))
            && (scaleDegree.includes(',') || scaleDegree.includes('u')) ) {
                oneScaleDegree = scaleDegree.slice(2);              
        } else if ( scaleDegree.includes('b') || scaleDegree.includes('#')) {
            oneScaleDegree = scaleDegree.slice(1);
        } else if ( scaleDegree.includes(',') || scaleDegree.includes('u')) {
            oneScaleDegree = scaleDegree.slice(1);
        } else {
            oneScaleDegree = scaleDegree.slice();
        }
//        console.log('(index + Number(oneScaleDegree)-1) % ALPHA_NAMES.length='+(index + Number(oneScaleDegree)-1) % ALPHA_NAMES.length);
        alphaLetter = ALPHA_NAMES[(index + Number(oneScaleDegree)-1) % ALPHA_NAMES.length];
//        newList.push(ALPHA_NAMES[(index + Number(oneScaleDegree)-1) % ALPHA_NAMES.length]);
//-----------------------------------*/
//    console.log('alphaLetter='+alphaLetter);
//    alphaLetter = ALPHA_NAMES[startIndex]
    return alphaLetter;

}


/**
 * this function creates a scale formula from scaleString
 * @private
 * @param {string} scaleString
 * @returns {number} array scale formula
 */
function makeScaleFormula(scaleString) {
//    console.log('typeof(scaleString)='+ typeof(scaleString) +' scaleString='+scaleString);
//    var scaleArray = scaleString.split(' ');
    var scaleArray = scaleString.split(/\s+/g); // split at white space
    var scaleFormula = [];
    var scaleValue = '';
    var octaveSymbol = '';
    var octaveOffset = 0;
	for(let i=0; i < scaleArray.length; i++) {
	    octaveOffset = 0;
	    octaveSymbol = '';
	    if(scaleArray[i].includes(octaveUp) || scaleArray[i].includes(octaveDown) ) {
	        // strip off the octaveSymbol
	        octaveSymbol = scaleArray[i].slice(0,1);
	        scaleValue = scaleArray[i].slice(1);
	    } else {
	        scaleValue = scaleArray[i];
	    }
	    if(octaveSymbol !== '') {
	        if(octaveSymbol === octaveDown) {
	            octaveOffset = -12;
	        } else if(octaveSymbol === octaveUp) {
	            octaveOffset = 12;
	        }
	    }
		scaleFormula.push(scaleDegreeToHalfSteps[scaleValue] + octaveOffset);
    }
    return scaleFormula;
}

// this function assumes chordString in the form '5 9 3 7' is from low to high
// the 5th is the lowest note and it will put the 3rd above the 9th.  The 7th will be the highest note.
/**
 * this function creates a chord formula from chordString
 * assumes chordString in the form '5 9 3 7' is from low to high.
 * the 5th is the lowest note and it will put the 3rd above the 9th.  
 * The 7th will be the highest note.
 * @private
 * @param {string} chordString
 * @returns {number} array chord formula
 */
function makeChordFormula(chordString) {
//    console.log('typeof(chordString)='+ typeof(chordString) +' chordString='+chordString);
//    var chordArray = chordString.split(' ');
    var chordArray = chordString.split(/\s+/g); // split at white space
    var chordFormula = [];
    var chordValue = '';
    var octaveSymbol = '';
    var octaveOffset = 0;
    var currValue = 0;
    var prevValue = 0;
	for(let i=0; i < chordArray.length; i++) {
	    octaveOffset = 0;
	    octaveSymbol = '';
	    if(chordArray[i].includes(octaveUp) || chordArray[i].includes(octaveDown) ) {
	        // strip off the octaveSymbol
	        octaveSymbol = scaleArray[i].slice(0,1);
	        chordValue = chordArray[i].slice(1);
	    } else {
	        chordValue = chordArray[i];
	    }
	    if(octaveSymbol !== '') {
	        if(octaveSymbol === octaveDown) {
	            octaveOffset = -12;
	        } else if(octaveSymbol === octaveUp) {
	            octaveOffset = 12;
	        }
	    }
	    currValue = scaleDegreeToHalfSteps[chordValue] + octaveOffset;
	    while(currValue < prevValue) {
	        currValue += 12;
	    }
		chordFormula.push(currValue);
		prevValue = currValue;
    }
    return chordFormula;
}


/**
 * this function makes an array of objects of a chord progression
 * @public
 * @param {string} rhythmArray
 * @param {string} chordArray
 * @returns {object} array used with Tone.js to play chord progression.
 */
function makeRhythmAndChordProg(rhythmArray, chordArray) {
	/*
	chordArray format:
	[['Dm7', 'D3', 'b3 b7 9'], ['G7', 'G2', 'b7 3 13 b9'], ['Cma7', 'C3', '3 7 9 5'], 
		['Am7', 'A2', '5 9 b3 b7'] ];
	
	rhythmArray format: '|' indicates a chord change
	['4n','8nr','8n','2nr','|','4n','8nr','8n','2nr','|','4n','8nr','8n','2nr','|','4n','8nr','8n','2nr']
	
	*/
	
	// do sanity check of chordArray.length-1 == number of '|' in rhythmArray
	
	var newRhythmArray = [];
	var newChordArray = [];
	var rhythmAndChordArray = []
	var oneChord = [];
	var chordPlayedCount = 0;
	var chordArrayIndex = 0;
	var i, j;
	// loop thru the rhythmArray
	for(i=0; i<rhythmArray.length; i++) {
		// push each element into newRhythmArray except the '|' elements
		if(rhythmArray[i] != '|') {
			newRhythmArray.push(rhythmArray[i]);
			// count the number of non-rests in each section
			if( !rhythmArray[i].includes('r') ) {
				chordPlayedCount = chordPlayedCount + 1;
			}
		} else { // found '|' element
			oneChord = makeOneChordArray(chordArray[chordArrayIndex][2], chordArray[chordArrayIndex][1])
			// push to the newChordArray the number of oneChord as needed for that section
			for(j=0; j<chordPlayedCount; j++) {
				newChordArray.push(oneChord);
			}
			chordPlayedCount = 0;
			chordArrayIndex = chordArrayIndex + 1;
			oneChord = [];
		}
	}
	if(chordPlayedCount > 0) {
		oneChord = makeOneChordArray(chordArray[chordArrayIndex][2], chordArray[chordArrayIndex][1])
		// push to the newChordArray the number of oneChord as needed for that section
		for(j=0; j<chordPlayedCount; j++) {
			newChordArray.push(oneChord);
		}	
	}
	// flatten arrays
//	console.log('newRhythmArray='+newRhythmArray);
//	console.log('newChordArray='+newChordArray);
	
	rhythmAndChordArray.push(newRhythmArray);
	rhythmAndChordArray.push(newChordArray);
    return rhythmAndChordArray;
}


/*-------------------------------------------
function makeChordFormula(chordString) {
    var chordFormula = makeScaleFormula(chordString);
    console.log('chordString='+chordString+' chordFormula='+chordFormula);
    return chordFormula;
} 
//-----------------------------------------*/

/**
 * this function makes a chord array of MIDI numbers
 * @private
 * @param {string} chordFormulaArray
 * @param {string} startingMidiNoteOrPitchOctave
 * @returns {number} array chord array of MIDI numbers
 */
function makeMIDIChordArray(chordFormulaArray, startingMidiNoteOrPitchOctave) {
    var chordProgMIDI = [];
    var aChordMIDI = [];
    if( !Number.isInteger(startingMidiNoteOrPitchOctave) ) {
        var startingMidiNote = noteNameToMIDI(startingMidiNoteOrPitchOctave)
    } else {
        var startingMidiNote = startingMidiNoteOrPitchOctave;
    }
    chordFormulaArray.forEach( function(chord) {
        aChordMIDI = makeMIDIArray(chord, startingMidiNote)
        chordProgMIDI.push( aChordMIDI );
    });
    return chordProgMIDI;
}

/**
 * this function makes a scale array of MIDI numbers
 * @private
 * @param {string} scaleString
 * @param {string} startingMidiNoteOrPitchOctave
 * @returns {number} array of MIDI numbers
 */
function makeMIDIArray(scaleString, startingMidiNoteOrPitchOctave) {
    var midiArray = [];
    var formula = makeScaleFormula(scaleString);
    if( !Number.isInteger(startingMidiNoteOrPitchOctave) ) {
        var startingMidiNote = noteNameToMIDI(startingMidiNoteOrPitchOctave)
    } else {
        var startingMidiNote = startingMidiNoteOrPitchOctave;
    }
	for(let i=0; i < formula.length; i++) {
		midiArray[i] = formula[i] + startingMidiNote;
    }
    return midiArray;
}

/**
 * this function makes an array frequencies from MIDI number inputs
 * @private
 * dependent on Tone.js library
 * @param {number} array midiArray
 * @returns {number} array of frequency numbers
 */
function makeFrequencyArray(midiArray) {
    var freqArray = [];
	for(let i=0; i < midiArray.length; i++) {
		freqArray[i] = Tone.Frequency(midiArray[i], 'midi').toFrequency();
    }
    return freqArray;    
}

/**
 * this function makes an array noteName from MIDI number inputs
 * @private
 * dependent on Tone.js library
 * NOTE: may not return desired enharmonic
 * @param [{number}] midiArray
 * @returns {string} array of noteNames
 */
function makePitchOctaveArray(midiArray) {
    var noteArray = [];
	for(let i=0; i < midiArray.length; i++) {
		noteArray[i] = Tone.Frequency(midiArray[i], 'midi').toNote();
    }
    return noteArray;    
}

/**
 * this function makes a Frequency array from a scaleFormula and root
 * @public
 * @param {string} scaleDegreeFormula
 * @param {string} root
 * @returns {number} array of frequencies
 */
function makeFreqArray(scaleDegreeFormula, root)  {
    var i;
    var midiArray = makeMIDIArray(scaleDegreeFormula, root);
//    console.log('midiArray='+midiArray)
    var frequencyArray = makeFrequencyArray(midiArray);
    return frequencyArray;
}

/**
 * this function makes a noteName array from a scaleFormula and root
 * @public
 * @param {string} scaleDegreeFormula
 * @param {string} root
 * @returns {object} array of noteNames
 * @example
 * var harm_minor = '1 2 b3 4 5 b6 7 8';
 * var my_root = "G4";
 * var g_minor = makeNoteArray(harm_minor, my_root);
 * // g_minor = ["G4","A4","Bb4","C5","D5","Eb5","F#5","G5"]
 */
function makeNoteArray(scaleDegreeFormula, root)  {
    var i, startIndex;
    var MIDIArray = makeMIDIArray(scaleDegreeFormula, root);
//    console.log('scaleDegreeFormula='+scaleDegreeFormula+' MIDIArray='+MIDIArray);
    var myAlphaNames = [];
    var noteArray = [];
    var alphaNames = ["A","B","C","D","E","F","G"];
    var MIDIRoot = Tone.Frequency(root).toMidi();;
//    var scaleDegrees = scaleDegreeFormula.split(' ');
    var scaleDegrees = scaleDegreeFormula.split(/\s+/g); // split at white space

    myAlphaNames = makeAlphaListFromFormula(scaleDegrees, root);
//    console.log('myAlphaNames='+myAlphaNames);

// translate the MIDIArray into appropriate 
// LetterName/OctaveNumber format in relation to root and scaleDegreeFormula
// choose appropriate letter name for each MIDIArray element
// using myAlphaNames array.

    for(i=0; i<MIDIArray.length; i++) {
        noteArray.push(getLetterOctave(MIDIArray[i], myAlphaNames[i]));
    }
    return noteArray;
}

/**
 * this function makes a noteName chord array from a scaleDegreeChordArray and root
 * @public
 * @param {string} scaleDegreeChordArray
 * @param {string} root
 * @returns {object} array of noteName
 * @example
 * var my_triad = '1 b3 5';
 * var my_root = "C#4";
 * var my_chord = makeChordArray(harm_minor, my_root);
 * // my_chord = ["C#4","E4","G#4"]
 */
function makeChordArray(scaleDegreeChordArray, root)  {
    var chordsArray = [];
    var aChord = [];
    console.log('scaleDegreeChordArray='+scaleDegreeChordArray);
    scaleDegreeChordArray.forEach( function(chord) {
//        aChord = makeFreqArray(chord, root);
        aChord = makeNoteArray(chord, root);
//        console.log('aChord='+aChord)
        chordsArray.push(aChord);
    });

    return chordsArray;
}

/**
 * this function makes one chord array from a scaleDegreeChordArray and root
 * @private
 * @param {string} scaleDegreeChordArray
 * @param {string} root
 * @returns {object} array of noteNames in the chord 
 */
function makeOneChordArray(scaleDegreeChordString, root)  {
    var scaleDegreeChordFormula = makeChordFormula(scaleDegreeChordString);
    var MIDIArray = [];
    var MIDIRoot = noteNameToMIDI(root);
//    var MIDIRoot = Tone.Frequency(root).toMidi();;
    for(var i=0; i<scaleDegreeChordFormula.length; i++) {
        MIDIArray.push(scaleDegreeChordFormula[i] + MIDIRoot);
    }
//    console.log('scaleDegreeChordFormula='+scaleDegreeChordFormula+' MIDIArray='+MIDIArray);
    var myAlphaNames = [];
    var aChord = [];
    var alphaNames = ["A","B","C","D","E","F","G"];
//    var scaleDegrees = scaleDegreeChordString.split(' ');
    var scaleDegrees = scaleDegreeChordString.split(/\s+/g); // split at white space

    myAlphaNames = makeAlphaListFromFormula(scaleDegrees, root);
//    console.log('myAlphaNames='+myAlphaNames);

// translate the MIDIArray into appropriate 
// LetterName/OctaveNumber format in relation to root and scaleDegreeFormula
// choose appropriate letter name for each MIDIArray element
// using myAlphaNames array.

    for(i=0; i<MIDIArray.length; i++) {
        aChord.push(getLetterOctave(MIDIArray[i], myAlphaNames[i]));
    }
    return aChord;
}


/**
 * this function makes a frequency chord array from a scaleDegreeChordArray and root
 * @public
 * @param {string} scaleDegreeChordArray
 * @param {string} root
 * @returns {object} array of frequencies
 */
function makeChordFreqArray(scaleDegreeChordArray, root)  {
    var chordsArray = [];
    var aChord = [];
    var chordsArrayMIDI = makeMIDIChordArray(scaleDegreeChordArray, root);
    chordsArrayMIDI.forEach( function(chordMIDI) {
        aChord = makeFrequencyArray(chordMIDI);
        chordsArray.push(aChord);
    });
    return chordsArray;
}

/**
 * this function makes an array of objects creating a melody
 * @public
 * @param {string} scaleDegreeFormula
 * @param {string} root
 * @param {string} rhythmArray
 * @param {string} optionalStartTime
 * @param {string} optionalVelocity
 * @returns {object} array used with Tone.js as melody
 * @example
 * var my_scale_degrees = "1 5 6 5";
 * var my_root = "C4";
 * var my_durations = ["4n","8n","4n","8n"];
 * var my_melody(my_scale_degrees, my_root, my_durations);
 * // my_melody = [{{note: {value: "C4"}}, {duration: {value: "4n}}, {velocity: {value: 0.7}}},
 * //               {{note: {value: "G4"}}, {duration: {value: "8n}}, {velocity: {value: 0.7}}},
 * //                {{note: {value: "A4"}}, {duration: {value: "4n}}, {velocity: {value: 0.7}}},
 * //                 {{note: {value: "G4"}}, {duration: {value: "8n}}, {velocity: {value: 0.7}}}]                
 */
function makeMelody(scaleDegreeFormula, root, rhythmArray, optionalStartTime, optionalVelocity) {
	var myStartTime = "0";
	var myVelocity = 0.7;
	if(optionalStartTime == undefined)
		myStartTime = "0";
	else
		myStartTime = optionalStartTime.toString();

	if(optionalVelocity == undefined)
		myVelocity = 0.7;
	else
		myVelocity = optionalVelocity;

    var noteArray = makeNoteArray(scaleDegreeFormula, root);
    var notesAndRhythm = Rhythm.mergeDurationVelocityAndPitch(rhythmArray, noteArray, myVelocity, myStartTime);
//    console.log(notesAndRhythm);
    return notesAndRhythm;
}

/**
 * this function converts a MIDI number into a noteName
 * @private
 * @param {number} midiNum
 * @param {string} alphaName
 * @returns {string} noteName
 */
function getLetterOctave(midiNum, alphaName) {
    var correctNameAndOctave = "F#7"; // audible error if not found;
    
	if ( MIDI_SHARP_NAMES[midiNum].includes(alphaName) ) {
		correctNameAndOctave = MIDI_SHARP_NAMES[midiNum];
	} else if (MIDI_FLAT_NAMES[midiNum].includes(alphaName) ) {
		correctNameAndOctave = MIDI_FLAT_NAMES[midiNum];
	} else if (MIDI_OTHER_NAMES[midiNum].includes(alphaName) ) {
		correctNameAndOctave = MIDI_OTHER_NAMES[midiNum];
	} else {
	    correctNameAndOctave = MIDI_SHARP_NAMES[midiNum];
	}

    return correctNameAndOctave;
}

// this function takes an array of notes in the form letterName/octave (scientic music notation?)
// i.e. var Cmajor = ['C3','D3','E3','F3','G3','A3','B3','C4'];
// var Eb major = TransposeSequence(Cmajor, 3);
// var A_major = TransposeSequence(Cmajor, -3);
/**
 * this function transposes an arrayOfNotes by a specified number of half steps
 * @public
 * @param {string} arrayOfNotes
 * @param {number} transposeHalfSteps
 * @returns {string} string array of transposed notes
 * NOTE: doesn't deal with correct name but only the correct sounding pitch
 */
function TransposeSequence(arrayOfNotes, transposeHalfSteps) {
    var newArrayOfNotes = [];
    var MIDInumbers = [];
    
// change the arrayOfNotes into an array of MIDI numbers
// and transpose the MIDI number array by transposeHalfSteps
//    console.log('TransposeSequence: arrayOfNotes='+arrayOfNotes.toString());
    for(var i=0; i < arrayOfNotes.length; i++) {
        MIDInumbers[i] = ( noteNameToMIDI(arrayOfNotes[i])  + transposeHalfSteps);
    }
    

// translate the MIDI number array back into a new arrayOfNotes
// this doesn't deal with correct name but only the correct sounding pitch
// from the MIDI_SHARP_NAMES array nameset.
    for(var i=0; i < arrayOfNotes.length; i++) {
        newArrayOfNotes[i] = MIDI_SHARP_NAMES[MIDInumbers[i]];
    }
// return new arrayOfNotes
    return newArrayOfNotes;
}

// for a key return the root of any scale degree
// i.e. getRoot('G', 'b6'); returns 'Eb'
// no octave number is added
/**
 * this function returns the letter name of any scale degree for a given key
 * @public
 * @param {string} keyRoot
 * @param {string} scaleDegree
 * @return {string} noteName of scale degree
 */
function getRoot(keyRoot, scaleDegree) {
	var letter = makeAlphaLetterFromFormula(scaleDegree, keyRoot);
    var chromatic_symbol = '';
    var midiOffset = scaleDegreeToHalfSteps[scaleDegree];
    // if keyRoot has an octaveNumber strip it off.
    var maybeNumber = Number(keyRoot[-1]);
    var root;

    if(Number.isInteger(maybeNumber)) {
        root = keyRoot.slice(0,-1);
    } else {
        root = keyRoot;
    }
    // compare the midi numbers of the natural letter name the scaleDegree param
    var rootMIDI = MIDI_CLASS[root];
    var letterMIDI = MIDI_CLASS[letter];
    var MIDI_diff = ((rootMIDI + midiOffset) % 12) - letterMIDI;
//    console.log('((rootMIDI='+rootMIDI+' + midiOffset='+midiOffset+') % 12)='+((rootMIDI + midiOffset) % 12)+' letterMIDI='+letterMIDI+' MIDI_diff='+MIDI_diff);
    
    // using rhe difference from above now determine the appropriate chromatic sign
    if(MIDI_diff !== 0) {
        if(MIDI_diff == 1)
            chromatic_symbol = '#';
        else if(MIDI_diff == 2)
            chromatic_symbol = 'x';
        else if(MIDI_diff == -1)
            chromatic_symbol = 'b';
        else if(MIDI_diff == -2)
            chromatic_symbol = 'bb';      
    }
    letter += chromatic_symbol;
    return letter;
}


function testModule() {
    var myFormula = '1 2 3 #4 5 6 b7 8';
//    var myFormula = '1 3 5 b7 9 #11 13';
//    var myFormula = BluesTurnaround_v5;
//    console.log('BluesTurnaround_v5='+BluesTurnaround_v5)
    var myRoot = 'C4';
    var correctNoteResult = ["C4","D4","E4","F#4","G4","A4","B4","C5"];
    
    var myNotes = makeNoteArrayFromScaleDegreeFormula(myFormula, myRoot);
    console.log('myNotes='+myNotes); // +' correctNoteResult='+correctNoteResult);
    
    var myFreqs = makeFreqArrayFromScaleDegreeFormula(myFormula, myRoot);
    console.log('myFreqs='+myFreqs); // +' correctFreqResult='+correctFreqResult);
}

return {
    makeFreqArray: makeFreqArray,
    makeNoteArray: makeNoteArray,
    makeChordArray: makeChordArray,
    makeChordFreqArray: makeChordFreqArray,
    makeRhythmAndChordProg: makeRhythmAndChordProg,
    TransposeSequence: TransposeSequence,
    getRoot: getRoot,
    II_V_I_MAJOR_v1: II_V_I_MAJOR_v1,
    II_V_I_MINOR_v1: II_V_I_MINOR_v1,
    II_V_I_MAJOR_v2: II_V_I_MAJOR_v2,
    II_V_I_MINOR_v2: II_V_I_MINOR_v2,
    II_V_I_MAJOR_v3: II_V_I_MAJOR_v3,
    II_V_I_MINOR_v3: II_V_I_MINOR_v3,
    makeII_V_I_Major: makeII_V_I_Major,
    makeII_V_I_Minor: makeII_V_I_Minor, 
    makeII_V_I_Major_WalkBass: makeII_V_I_Major_WalkBass,
    makeII_V_I_Minor_WalkBass: makeII_V_I_Minor_WalkBass,
    makeMelody: makeMelody
};

})();  // end scaleDegree module