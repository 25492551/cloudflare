# Zero Prediction Analysis Report

**Created**: 2025-12-21  
**Script**: `script/7.py`  
**Purpose**: Analysis of zero location prediction model combining macroscopic and microscopic predictions

---

## 1. Overview

This report analyzes the `script/7.py` script. This script compares two methods to predict the 30th zero of the Riemann zeta function: macroscopic prediction (statistics) and microscopic prediction (physics).

### 1.1 Objectives

- Macroscopic prediction using the Riemann-von Mangoldt formula
- Microscopic prediction using Coulomb repulsion and GUE properties
- Comparison of accuracy of the two methods

---

## 2. Script Analysis

### 2.1 Data Preparation

```python
true_zeros = np.array([14.1347, 21.0220, ..., 101.3178])  # 30 zeros
train_zeros = true_zeros[:-1]  # First 29 (training data)
target_zero = true_zeros[-1]    # 30th (target)
```

- **Data source**: Odlyzko Table (actual zero values)
- **Training data**: First 29 zeros
- **Target**: 30th zero (101.3178)

### 2.2 Macroscopic Prediction

#### 2.2.1 Riemann-von Mangoldt Formula

```python
def riemann_n_formula(t, n):
    val = (t / (2 * np.pi)) * np.log(t / (2 * np.pi)) - (t / (2 * np.pi)) + 0.875
    return val - n
```

**Meaning**:
- N(t): Number of zeros with imaginary part ≤ t
- Inverse function: Estimate approximate location of nth zero

**Formula**:
```
N(t) = (t / 2π) × log(t / 2π) - (t / 2π) + 7/8
```

#### 2.2.2 Prediction Calculation

```python
macro_prediction = fsolve(riemann_n_formula, x0=100, args=(30))[0]
```

- **Method**: Using `scipy.optimize.fsolve`
- **Initial value**: 100
- **Goal**: Find t such that N(t) = 30

### 2.3 Microscopic Prediction

#### 2.3.1 Gap Analysis

```python
recent_gaps = np.diff(train_zeros)[-5:]  # Last 5 gaps
avg_local_gap = np.mean(recent_gaps)     # Average gap
last_gap = train_zeros[-1] - train_zeros[-2]  # Previous gap
```

**Meaning**:
- Analyze recent gap patterns
- Calculate average gap
- Compare with previous gap

#### 2.3.2 Repulsion Correction

```python
elasticity = 0.6  # Restoring force coefficient
correction = elasticity * (avg_local_gap - last_gap)
micro_prediction = last_zero + avg_local_gap + correction
```

**Logic**:
- **Previous gap narrower than average**: Bounces out (gap increases)
- **Previous gap wider than average**: Pulled in (gap decreases)
- **Regression to mean**: Elasticity effect

### 2.4 Visualization

- **Past zeros**: Black vertical lines
- **Actual 30th zero**: Green star
- **Macroscopic prediction**: Blue triangle
- **Microscopic prediction**: Red inverted triangle
- **Connection lines**: Inference process of microscopic prediction

### 2.5 Error Calculation

```python
error_macro = abs(target_zero - macro_prediction)
error_micro = abs(target_zero - micro_prediction)
```

---

## 3. Mathematical Background

### 3.1 Riemann-von Mangoldt Formula

**History**:
- Riemann (1859): Proposed zero counting function
- von Mangoldt (1905): Proved exact formula

**Meaning**:
- "Average" distribution of zeros
- Large-scale statistical properties
- Asymptotic behavior

### 3.2 GUE (Gaussian Unitary Ensemble)

**Features**:
- **Level Repulsion**: Repulsion between energy levels
- **Gap distribution**: Wigner-Dyson distribution
- **Statistical model**: Random matrix theory

**Application to zeros**:
- Zeros also follow GUE distribution
- Gaps repel each other
- Property of regression to mean

### 3.3 Coulomb Gas Model

- **Repulsion**: Repulsion between zeros
- **Elasticity**: Regression to average gap
- **Microscopic correction**: Gap pattern analysis

---

## 4. Expected Results Analysis

### 4.1 Macroscopic Prediction

- **Advantages**: Reflects large-scale statistical properties
- **Disadvantages**: Ignores local variations
- **Expected error**: Relatively large

### 4.2 Microscopic Prediction

- **Advantages**: Reflects local patterns
- **Disadvantages**: Depends on parameters (elasticity)
- **Expected error**: Relatively small

### 4.3 Comparison Results

**Expected scenario**:
- Microscopic prediction likely more accurate
- Local gap patterns are important
- Elasticity effect actually works

---

## 5. Technical Details

### 5.1 Numerical Optimization

- **fsolve**: Nonlinear equation solver
- **Initial value**: 100 (reasonable estimate)
- **Convergence**: Fast convergence expected

### 5.2 Statistical Analysis

- **Average gap**: Use last 5
- **Previous gap**: Between last 2 zeros
- **Correction**: Elasticity coefficient 0.6

### 5.3 Visualization

- **Range**: 90 ~ 105 (around 30th zero)
- **Markers**: Various shapes and colors
- **Labels**: Clear descriptions

---

## 6. Conclusions and Observations

### 6.1 Main Findings

1. **Two approaches**: Statistics vs physics
2. **Microscopic correction**: Importance of local patterns
3. **Prediction possibility**: Possibility of zero location prediction

### 6.2 Mathematical Meaning

- **Macroscopic**: Large-scale statistical properties
- **Microscopic**: Local dynamics
- **Integration**: Possibility of combining two approaches

### 6.3 Practical Meaning

- **Zero calculation**: More efficient algorithms
- **Prediction model**: Finding new zeros
- **Verification**: Application to Riemann hypothesis verification

### 6.4 Future Research Directions

1. **Hybrid model**: Combine two methods
2. **More data**: Use more zeros
3. **Parameter optimization**: Tune elasticity, etc.
4. **Machine learning**: Pattern learning models

---

## 7. References

1. **Riemann, B. (1859)**: "Über die Anzahl der Primzahlen unter einer gegebenen Größe"
2. **von Mangoldt, H. (1905)**: Riemann-von Mangoldt formula
3. **Odlyzko, A. M.**: Zero tables
4. **GUE Theory**: Random matrix theory

---

**Author**: Cursor AI  
**Created**: 2025-12-21  
**Related Files**:
- `script/7.py`: Zero prediction script
- `plan/plan01.md`: Project planning document
