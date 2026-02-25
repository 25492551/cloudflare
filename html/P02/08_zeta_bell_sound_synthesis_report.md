# Riemann Zeta Function Zero-Based Sound Synthesis Analysis Report

**Created**: 2025-12-21  
**Script**: `script/8.py`  
**Purpose**: Analysis of the process of converting non-trivial zeros of the Riemann zeta function into frequencies for sound synthesis

---

## 1. Overview

This report analyzes and documents the execution results of the `script/8.py` script. This script is a sound synthesis program that converts non-trivial zeros of the Riemann zeta function into frequencies to generate "non-commutative harmonies."

### 1.1 Objectives

- Convert zeros of the Riemann zeta function into acoustic signals
- Express mathematical relationships between zeros as musical harmonies
- Implementation of non-commutative scale

---

## 2. Script Analysis

### 2.1 Main Components

#### 2.1.1 Data: Riemann Zeta Function Zeros

The script uses the imaginary part values of the first 50 non-trivial zeros of the Riemann zeta function:

```python
zeros = np.array([
    14.1347, 21.0220, 25.0109, 30.4249, 32.9351, 37.5862, 40.9187, 43.3271, 48.0052, 49.7738,
    52.9703, 56.4462, 59.3470, 60.8318, 65.1125, 67.0798, 69.5464, 72.0672, 75.7047, 77.1448,
    79.3374, 82.9104, 84.7355, 87.4253, 88.8091, 92.4919, 94.6513, 95.8706, 98.8312, 101.3178,
    103.7255, 105.4466, 107.1686, 111.0295, 111.8747, 114.3202, 116.2266, 118.7907, 121.3701, 122.9468,
    124.2568, 127.5166, 129.5787, 131.0876, 133.4977, 134.7565, 138.1160, 139.7362, 141.1237, 143.1118
])
```

**Features**:
- Real part of all zeros is 0.5 (Riemann hypothesis)
- Only imaginary parts used for frequency conversion
- Total of 50 zeros used

#### 2.1.2 Frequency Mapping

```python
base_freq = 220.0  # A3 note
ratio = zeros / zeros[0]  # Calculate ratio relative to first zero (14.1347)
freq = base_freq * r  # Convert each zero to frequency
```

**Mapping method**:
- First zero (14.1347) → 220 Hz (A3 note)
- Other zeros determined by ratio relative to first zero
- Example: Second zero (21.0220) → 220 × (21.0220 / 14.1347) ≈ 327.2 Hz

**Mathematical meaning**:
- Ratio relationships between zeros converted to frequency ratios
- Forms a "non-commutative scale" different from traditional scales (12-tone equal temperament, etc.)

#### 2.1.3 Sound Synthesis Method: Additive Synthesis

Convert each zero into an independent oscillator for synthesis:

```python
for i, r in enumerate(ratio):
    freq = base_freq * r
    amplitude = 1.0 / (i + 1)**0.8  # Amplitude decay
    decay = np.exp(-t * (i * 0.1 + 0.5))  # Time-dependent decay
    waveform += amplitude * np.sin(2 * np.pi * freq * t) * decay
```

**Synthesis parameters**:

1. **Amplitude**:
   - `amplitude = 1.0 / (i + 1)^0.8`
   - Amplitude decreases for higher zeros
   - First zero is strongest

2. **Decay**:
   - `decay = exp(-t * (i * 0.1 + 0.5))`
   - Exponentially decays over time
   - Higher zeros disappear faster
   - Creates "bell-like" texture

3. **Waveform**:
   - Pure sine wave: `sin(2π × freq × t)`
   - Each zero synthesized as independent tone

#### 2.1.4 Normalization and Saving

```python
waveform = waveform / np.max(np.abs(waveform))  # Normalize
write(filename, sr, (sound_wave * 32767).astype(np.int16))  # Save as WAV file
```

- Normalize maximum amplitude to 1.0
- Save in 16-bit PCM format (range: -32767 ~ 32767)

---

## 3. Execution Results

### 3.1 Generated File

- **Filename**: `riemann_zeta_bell.wav`
- **Location**: Project root directory (`/home/seungun/project/P02/`)
- **File size**: 690 KB
- **Audio format**: 
  - RIFF WAVE format
  - Microsoft PCM
  - 16-bit, mono
  - Sampling rate: 44,100 Hz
  - Duration: 8.0 seconds

### 3.2 Calculated Parameters

- **Total samples**: 44,100 × 8.0 = 352,800 samples
- **Number of zeros used**: 50
- **Base frequency**: 220 Hz (A3)
- **Frequency range**: 
  - Minimum: 220 Hz (first zero)
  - Maximum: Approximately 2,226 Hz (50th zero, 143.1118 / 14.1347 × 220)

### 3.3 Acoustic Characteristics Analysis

#### 3.3.1 Frequency Distribution

Converting zero ratios to frequencies:

| Zero # | Zero Value (Imaginary) | Frequency (Hz) | Approximate Pitch |
|--------|------------------------|----------------|-------------------|
| 1 | 14.1347 | 220.0 | A3 |
| 2 | 21.0220 | 327.2 | E4 |
| 3 | 25.0109 | 389.5 | G4 |
| 10 | 49.7738 | 775.0 | G5 |
| 20 | 77.1448 | 1,201.0 | D6 |
| 30 | 101.3178 | 1,577.0 | G6 |
| 40 | 122.9468 | 1,916.0 | B6 |
| 50 | 143.1118 | 2,226.0 | C#7 |

**Observations**:
- Frequency distribution is nonlinear, different from traditional scales
- Irregular frequency spacing due to irregular zero spacing

#### 3.3.2 Amplitude and Decay Patterns

- **First zero**: Amplitude 1.0, slow decay
- **50th zero**: Amplitude approximately 0.027, fast decay

This results in:
- All zeros ringing together initially
- Lower frequencies (lower zeros) persist longer over time
- "Bell" or "chime" like timbre

---

## 4. Mathematical Background

### 4.1 Riemann Zeta Function and Zeros

The Riemann zeta function ζ(s) is defined as:

```
ζ(s) = Σ(n=1 to ∞) 1/n^s
```

where s = σ + it (complex number).

**Riemann Hypothesis**: The real part of all non-trivial zeros is 1/2.

That is, zeros are of the form s = 1/2 + it.

### 4.2 Physical Interpretation of Zeros

This script interprets zeros as follows:

1. **Points in frequency space**: Imaginary part t of each zero relates to frequency
2. **Energy levels**: Order of zeros represents energy levels
3. **Non-commutative relationships**: Relationships between zeros differ from traditional music theory

### 4.3 Non-Commutative Scale

Traditional scales (e.g., 12-tone equal temperament) have frequency ratios that are rational number relationships:
- Octave: 2:1
- Perfect fifth: 3:2
- Major third: 5:4

In contrast, zeros of the Riemann zeta function:
- Ratios are close to irrational numbers
- Irregular spacing
- Have "non-commutative" relationships

---

## 5. Technical Details

### 5.1 Implementation Features

1. **Optional IPython support**:
   ```python
   try:
       import IPython.display as ipd
       HAS_IPYTHON = True
   except ImportError:
       HAS_IPYTHON = False
   ```
   - Supports both Jupyter notebook and regular Python environments

2. **Numerical stability**:
   - Prevents overflow through normalization
   - Appropriate scaling for 16-bit integer conversion

3. **Efficiency**:
   - Uses NumPy vectorized operations
   - Minimizes loops

### 5.2 Areas for Improvement

1. **Stereo support**: Currently only mono
2. **Various waveforms**: Options other than sine waves
3. **Interactive parameters**: Adjustable amplitude, decay, etc.
4. **Visualization**: Add frequency spectrum visualization

---

## 6. Conclusions and Observations

### 6.1 Main Achievements

1. **Sonification of mathematical concepts**: Conversion of Riemann zeta function zeros into sound
2. **Non-commutative scale implementation**: Scale system different from traditional music theory
3. **Practical implementation**: Generation of playable WAV files

### 6.2 Mathematical Meaning

- Discovery of "musical" properties of Riemann zeta function zeros
- Acoustic expression of irregularity in zero spacing
- Connection between mathematical and musical structures

### 6.3 Future Research Directions

1. **Use more zeros**: Extend to 50+ zeros
2. **Various synthesis methods**: FM synthesis, wavelet transforms, etc.
3. **Integration with zero prediction models**: Convert predicted zeros to sound
4. **Visualization integration**: Frequency spectrograms, waveform visualization

---

## 7. References

1. **Riemann, B. (1859)**: "Über die Anzahl der Primzahlen unter einer gegebenen Größe"
2. **Edwards, H. M. (2001)**: "Riemann's Zeta Function"
3. **Odlyzko, A. M.**: Tables of zeros of the Riemann zeta function
4. **Roads, C. (1996)**: "The Computer Music Tutorial" - Additive Synthesis

---

## 8. Appendix

### 8.1 Execution Commands

```bash
# Activate virtual environment
source venv/bin/activate

# Run script
python script/8.py
```

### 8.2 Generated File Information

- **Filename**: `riemann_zeta_bell.wav`
- **Format**: WAV (PCM 16-bit, Mono, 44.1 kHz)
- **Size**: 690 KB
- **Duration**: 8.0 seconds

### 8.3 Code Structure

```
generate_zeta_bell()
├── Load zero data
├── Generate time axis
├── Frequency mapping
├── Oscillator synthesis (loop)
│   ├── Frequency calculation
│   ├── Amplitude calculation
│   ├── Decay calculation
│   └── Waveform synthesis
├── Normalization
└── Return

Main execution
├── Function call
├── WAV file save
└── Output message
```

---

**Author**: Cursor AI  
**Created**: 2025-12-21  
**Related Files**:
- `script/8.py`: Sound synthesis script
- `riemann_zeta_bell.wav`: Generated audio file
- `plan/plan01.md`: Project planning document
