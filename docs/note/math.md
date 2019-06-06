# 线性代数

## 线性代数的本质

### 向量

$$
i \to \begin{bmatrix}
   1\\
   -2
\end{bmatrix}
j \to \begin{bmatrix}
   3 \\
   0
\end{bmatrix}
$$

### 线性变换

$$
\begin{bmatrix}
  x \\
  y
\end{bmatrix}\to x
\begin{bmatrix}
  1 \\
  -2
\end{bmatrix}+y
\begin{bmatrix}
  3 \\
  0
\end{bmatrix}=
\begin{bmatrix}
  1x + 3y\\
  -2x + 0y
\end{bmatrix}
$$

### 2 * 2 矩阵

$$
\begin{bmatrix}
  a && b \\
  c && d
\end{bmatrix}
\begin{bmatrix}
  x \\
  y
\end{bmatrix}=
x\begin{bmatrix}
  a \\
  c
\end{bmatrix}+y
\begin{bmatrix}
  b \\
  d
\end{bmatrix}=
\begin{bmatrix}
  ax + by \\
  cx + dy
\end{bmatrix}
$$

线性变换是操控空间的一种手段，它保持网格平行并等距分布，并且保持原点不动

### 三维空间中的线性变换

$$
\overrightarrow{V}=
\begin{bmatrix}
  x \\
  y \\
  z
\end{bmatrix}=xi + yj + zk
$$

输入向量

$$
\begin{bmatrix}
  0 && 1 && 2 \\
  3 && 4 && 5 \\
  6 && 7 && 8
\end{bmatrix}
\begin{bmatrix}
  & x & \\
  & y & \\
  & z & \\
\end{bmatrix}=x
\begin{bmatrix}
  0 \\
  3 \\
  6
\end{bmatrix}+y
\begin{bmatrix}
  1 \\
  4 \\
  7
\end{bmatrix}+z
\begin{bmatrix}
  2 \\
  5 \\
  8
\end{bmatrix}
$$

$
\begin{bmatrix}
  & 1 & 1 & 1 & \\
  & 0 & 1 & 0 & \\
  & -1 & 0 & 1 & \\
\end{bmatrix}
$
z轴旋转90度
$
\begin{bmatrix}
  & 0 & 0 & 1 & \\
  & 0 & 1 & 0 & \\
  & -1 & 0 & 0 & \\
\end{bmatrix}
$

## 线性变换行列式

对于一个2*2的矩阵$[[a, b], [c, d]]$， 公式是`ad - bc`
$$
det \left(
\begin{bmatrix}
  \color{green}a & \color{orange}b \\
  \color{green}c & \color{orange}d
\end{bmatrix}
\right)=
\color{green}a\color{orange}d - \color{green}c\color{orange}b
$$

$$
det \left(
\begin{bmatrix}
  a & b & c \\
  d & e & f \\
  g & h & i
\end{bmatrix}
\right)=
\color{green} a \space \color{black} det\left(
\begin{bmatrix}
  e & f \\
  h & i
\end{bmatrix}
\right)-
\color{green} b \space \color{black} det\left(
\begin{bmatrix}
  d & f \\
  g & i
\end{bmatrix}
\right)+
\color{green} c \space \color{black} det\left(
\begin{bmatrix}
  d & e \\
  g & h
\end{bmatrix}  
\right)
$$
