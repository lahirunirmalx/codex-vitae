# Retro-Mod Your Lab: The 1981 "Indestructible" Bench Power Supply

If you're serious about your electronics workbench, you know that relying on dry batteries is a recipe for frustration and voltage drops.. In March 1981, **A.R. Winstanley** published the ultimate "first item of test gear" for the serious constructor: a high-stability **Bench Power Supply** that still holds up as a masterclass in DIY engineering..

### The Core Tech: Built Like a Tank
The secret to this build's longevity is the **LM317K integrated circuit regulator** in the beefy **TO-3 metal "can" package**.. These chips aren't just regulators; they are practically bulletproof, featuring built-in thermal overload protection and safe-area compensation that makes them "nearly indestructible.". 

**Key Specs:**
*   **Variable DC Output:** 1.25V to 25V..
*   **Fixed AC Tappings:** 3V, 6V, 12V, 15V, 20V, 24V, and 30V for raw power needs..
*   **Current Limiting:** Precision control to protect your sensitive projects from magic smoke..
*   **Stability Pro-Level:** Uses a transistorized **"pre-regulator"** (TR1 and TR2) to kill ripple and ensure the ICs never exceed their maximum differential voltage..

---

### The Architecture: Block Diagram
The design flows from a multi-tapped **Douglas MT79AT transformer** through a bridge rectifier into the dual-stage regulation system..

**[Fig 3. Block diagram showing the system flow from AC input to regulated DC output]**
![The block diagram outlines the path from the mains transformer to the unregulated rectifiers, the current limiter stage (IC1), and the final voltage regulator (IC2).](https://img.com/placeholder_block_diagram).

---

### The Circuit: Precision Engineering
The schematic features a sophisticated layout where **IC1 handles the current limiting** and **IC2 manages the voltage regulation**.. Dual potentiometers allow for both **coarse and fine voltage adjustment**, giving you surgical precision over your output..

**[Fig 4. Complete circuit diagram of the Bench Power Supply]**
![The schematic details the full wiring, including the 1N5401 rectifier diodes, BZX61 Zener diodes for the pre-regulator, and the LM317K regulator stages.](https://img.com/placeholder_circuit_diagram).

---

### Pro-Tips for the Modern Builder
If you’re scouting parts to recreat this vintage beast, keep these 1981 "hard truths" in mind:
1.  **Chassis Alert:** You **must** use an **aluminium chassis**.. A steel case will mess with the magnetic fields of your analog meters and give you trash readings..
2.  **Heat Management:** The LM317s and power transistors need finned heatsinks and proper isolation using **mica washers and silicon grease**..
3.  **The "Safety Check":** Before you flip the switch, run a resistance check between the IC cases and the chassis—it should be **infinite**.. If you have a short, you're going to have a bad time..

### The Wiring Layout
The final assembly requires meticulous interwiring between the 100x100mm glass-fibre PCB, the front-panel meters, and the rear-mounted heatsinks..

**[Fig 6. Wiring diagram of the complete unit]**
![A detailed wiring guide showing the connections between the transformer secondary taps, the PCB, and the front panel controls.](https://img.com/placeholder_wiring_diagram).

### Verdict
Whether you're restoring a vintage unit or building a "retro-mod" version with modern components, the Winstanley Power Supply remains the gold standard for DIY test gear..