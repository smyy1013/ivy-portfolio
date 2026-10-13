# Hero

**Headline:** SOMIN IVY YOON

**Tagline:** Metal that moves. Signals that steer.

**Role:** Mechanical engineering junior | Electrical engineering minor · UIUC

**Subtitle:** I’m passionate about the intersection of mechanical and electrical systems, especially control systems, sensors, and automation. I enjoy being part of the whole process, from designing the mechanism to wiring the sensors, writing the control code, and testing it until it works reliably.

**Primary button:** See What I've Built

**Secondary button:** Download Resume

# Experience

### Littelfuse
Engineering Intern · May 2026 – Aug 2026
- Cut fuse sand-fill time by 37% with air-assisted dispensing, tested over 45 timed trials, and programmed a load-cell-controlled fill sequence on an Arduino Opta PLC.
- Cut X-ray fixture changeover from 60 s to 12 s with tool-free 3D-printed fixtures refined in weekly reviews with lab technicians.
- Automated laser labeling with a multi-family fixture and an Excel VBA tool, so 100 samples are labeled unattended.

### Human Dynamics and Controls Lab and Koine Adaptive
Research Lead, RAINIER V1 Drivetrain · In progress
- Leading a series-hybrid hand-crank drivetrain for adaptive trikes, built around a 48V bus, VESC field-oriented control, and CAN, with weekly design reviews with Prof. Elizabeth Hsiao-Wecksler.
- Interviewed leaders at 15+ adaptive recreation programs, and designed and built a trike footplate that adjusts in under 30 seconds.

### Yuil Trading Corporation, Seoul
Manufacturing Intern · May 2025 – Aug 2025
- Built and tested 250+ hospital suction units to ISO 10079, and wrote a Python pipeline that caught units just under the 20 L/min limit.
- Stopped oil backflow on a hydraulic operating table with a support fixture drawn in AutoCAD and 3D printed.

### Off-Road Illini Baja SAE
Project Lead, Shock Travel Logger · May 2026 – Present
- Leading the mechanical, firmware, and data work on a four-corner shock logger sampled at 500 Hz through a 12-bit ADC.

### Eco Illini Supermileage
Electrical and Body Teams · Aug 2026 – Present
- Designing a KiCAD PCB and sensor mount for a magnetic wheel speed encoder.

### American Society of Mechanical Engineers
Director of Special Projects
- Oversaw 6 Engineering Open House projects and recruited 70+ members.
- Led the AI translation mask team to 1st place in Visionary Impact among 200+ exhibits.

# What I Build

> Layout: each project is told as an engineering process. A stage is a numbered line, "1. **Label.** text", followed by zero or more pictures. Stages labelled Thinking, Trade-off, or Takeaway are highlighted as the reasoning behind the work.

## Internships

### Automatic sand dispenser
Engineering Intern · May 2026 – Aug 2026

**Org:** Littelfuse

![Sand flowing from the dispensing tip into the 3D-printed fixture](images/dispense-cover.jpg)

**Result:** Developed an air-assisted sand dispensing method that cut fuse fill time by 37% over 45 timed trials, and automated the fill with load-cell feedback on an Arduino Opta PLC.

**Tools:** Autodesk Inventor, 3D Printing, Pneumatics, Arduino Opta PLC, Load Cell, FEA

1. **Problem.** Many electrical fuses are filled with sand. When a fuse opens, the sand absorbs the heat of the arc and helps put it out, so how evenly it packs affects how the fuse performs. The existing gravity-fed process was slow, filled one fuse at a time, and needed a fixture change for every fuse type. My goal was a faster dispensing method that kept fill weight and compaction consistent.
   ![CMV sand-fill machine](images/dispense-1-problem.jpg)
   ![8-station sand-fill station](images/dispense-1-station.jpg)
2. **Thinking.** I started from the assumption that faster filling needed more dispensing force. My first prototype proved that wrong. The nozzle was already wide enough for sand to pass, so force was not what limited the flow. I shifted the design from pushing the sand out to helping it fall, with air-assisted gravity dispensing.
3. **Build.** The first prototype was a pneumatic piston that metered sand by volume, aiming for ±5% accuracy. The abrasive sand wore down the piston, cylinder, and seals, and performance dropped noticeably after about 7 trials, so I abandoned it. The second build was a 3D-printed fixture with interchangeable dispensing tips, which let me change one variable at a time.
   ![CAD of the fuse fixture from the initial concept](images/dispense-2-build.jpg)
   ![Initial experimental setup: the piston-based metering chamber on the 3D-printed fixture](images/dispense-2-piston.jpg)
   ![CAD of a dispensing tip with its air-injection port](images/dispense-2-tip.png)
4. **Test.** I compared three methods over 15 trials each, gravity only, air injection, and air injection with a weighted block pressing on the sand. I also varied tip geometry and vibration level. For every trial, I timed the fill to a target height from video and weighed the fuse before and after. Compaction tapping was done by hand, which I recorded as a known source of variability.
   ![Experimental setup: sand hopper, dispensing tip, and 3D-printed fixture](images/dispense-3-tune.jpg)
5. **Result.** Air injection alone cut the average fill time from 33.2 s to 21.8 s. Adding the weighted block brought it to 20.8 s, a 37% reduction, and made the process more repeatable, with the standard deviation dropping from 1.6 s to 1.0 s. Average fill weight stayed within about 1% (81.3 g to 82.3 g). The process settings are proprietary to Littelfuse and are not listed here.
   ![Sand flow by gravity alone](images/dispense-4-gravity.jpg)
   ![Sand flow with air assist](images/dispense-4-air.jpg)
6. **Automation.** To run the process without an operator, I chose delivered mass as the control signal. The fuse has to be weighed to verify the fill anyway, and unlike a timer, a weight reading lets the controller stop exactly when the target is reached. I programmed the fill sequence on an Arduino Opta PLC and read the load cell at 16-bit resolution. At 12 bits, a multi-kilogram load cell resolves only about a gram per count, which is too coarse for a fill under 100 g. The sequence ran successfully, and I checked the hopper under load in FEA. When the internship ended, the hopper and other mechanical parts had not been fully rebuilt, and the output circuit still needed fuses.
   ![Control circuit: the load cell signal goes to the PLC, which switches the valves and the vibration motor](images/dispense-2-wiring.png)
7. **Takeaway.** Faster filling did not come from more force. Learning that early shaped everything that followed, and the three-month timeline taught me to define a scope I could actually finish.

### Laser-labeling automation
Engineering Intern · May 2026 – Aug 2026

**Org:** Littelfuse

![Engineering samples on the printed fixture under the laser head](images/label-cover.jpg)

**Result:** Designed a 3D-printed laser fixture for several fuse families, checked in FEA, and an Excel VBA tool that labels 100 engineering samples unattended.

**Tools:** Excel VBA, Autodesk Inventor FEA, 3D Printing, PETG, Trotec Ruby

1. **Problem.** Every engineering sample needs a unique sample number and its ratings marked on it before testing. Labels were handwritten or typed into the laser software one at a time, small fuses were hard to mark consistently, and each fuse family needed its own laser fixture.
   ![One of the old single-family laser fixtures](images/label-1-old.jpg)
2. **Thinking.** I split the problem into a fixture and a program. The laser software could not be scripted, and adding a separate scripting platform would have been harder for the lab to maintain. So I wrote an Excel VBA tool that prepares the data, while template selection and job submission stay in the laser software the technicians already knew.
3. **Build.** The fixture holds several fuse families in one setup. I checked it in Inventor FEA with loads applied at each slot, then added triangular bridges and a flat middle support to reduce deflection over unsupported spans. The part was split to fit the printer bed and printed in PETG, which is less brittle than PLA. The VBA tool walks the user through six questions on a step-by-step form, validates every input, finds the fuse family from its series, picks the label size from its current rating, numbers the samples, and exports a CSV that the laser software reads through Dynamic Data.
   ![FEA of the first fixture design](images/label-3-fea.png)
   ![FEA after adding triangular bridges](images/label-3-fea2.png)
   ![Printed base plates, split to fit the printer bed](images/label-3-plates.jpg)
   ![The Excel VBA input page](images/label-3-excel.png)
4. **Test.** Early simulations showed exaggerated deflection along one edge. I traced it to the boundary conditions and contact settings rather than the design, and corrected the setup before comparing iterations. I also tested a rotary attachment for round fuses, but it held fewer samples per run and needed extra hardware. Finally, I engraved test samples at different laser settings to find the one that gave the clearest, most consistent marks.
   ![Label from the rotary attachment test](images/label-4-rotary.jpg)
   ![Test samples engraved at different laser settings](images/label-4-settings.jpg)
5. **Result.** Labeling 100 samples still takes about 30 minutes, but it now runs unattended, so technicians spend that time on other work. Manual sample numbering is gone, and labels come out consistent. I also designed a waterjet-cut aluminum fixture for a future version.
   ![Small fuses from several families loaded in one setup](images/label-5-multi.jpg)
   ![Laser-labeled engineering samples in the fixture](images/label-5-samples.jpg)
   ![Sketch of how the fixture parts fit together](images/label-2-sketch.jpg)
6. **Takeaway.** The most capable option is not always the right one. A tool the lab staff can maintain and extend after I leave was worth more than a more powerful script only I understood.

### Lab and X-ray test fixtures
Engineering Intern · May 2026 – Aug 2026

**Org:** Littelfuse

![Snap-fit quick-release rail on the X-ray fixture](images/lab-cover.jpg)

**Result:** Designed tool-free 3D-printed test and X-ray fixtures with lab technicians, cutting X-ray rail changeover from 60 s to 12 s.

**Tools:** Autodesk Inventor, 3D Printing, 8020 Aluminum Extrusion, Snap-Fit Design

1. **Problem.** In the Low Power Lab, fuses are tested for temperature rise under IEC and UL standards, mounted vertically for one and horizontally for the other, and then inspected by X-ray. The existing fixtures were product-specific. Technicians stacked blocks to set fuse height for UL tests, held cables with cable ties, and swapped X-ray rails with a bolt and nut in five steps, about 60 seconds each time.
   ![Blocks and cable ties in the old UL setup](images/lab-1-ul.jpg)
   ![Screw adjustment on the old X-ray fixture](images/lab-1-xray.jpg)
2. **Thinking.** Both fixtures needed to adjust without tools. For the lab fixture, I kept the 8020 frame but made the lower rack slide and lock with clamping handles. For the X-ray rails, a toggle clamp strong enough would not fit the machine bed. I borrowed the idea from the snap lock on a food container and chose a spherical snap fit, which engages and releases smoothly and spreads the load.
   ![Spherical snap fit, from insertion to recovery](images/lab-2-snap.png)
3. **Build.** I 3D printed every part so each change could be tested within hours. The cable holder went through three versions, from open slots, to interchangeable snap-fit holders, to a single rotating insert with several cable sizes. Humid weather printed the T-slot features oversized, so I adjusted the tolerances over several prints. A snap-fit hinge kept fracturing, so I dropped it.
   ![Three versions of the cable holder](images/lab-3-cable.png)
   ![Lab fixture frames with sliding clamps](images/lab-3-clamps.jpg)
   ![A clamping handle locks the lower rack in place](images/lab-3-handle.jpg)
   ![Scissor-linkage spacers holding blade fuses](images/lab-3-blade.jpg)
4. **Test.** I met with the lab technicians every week to review each version. Their feedback resized the snap fit, added holders for UL cables, and replaced a sliding blade-fuse spacer that did not grip firmly with a scissor linkage. I timed the X-ray changeover over 10 trials.
5. **Result.** X-ray rail changeover went from five steps to three, and from about 60 seconds to 12. One adjustable fixture now covers several fuse families and takes less storage space. I also designed a lever-driven mechanism to rotate fuses 90° in the X-ray, which was not built before the internship ended.
   ![The quick-release rail snapped onto the base](images/lab-5-release.jpg)
6. **Takeaway.** The technicians who used the fixtures every day shaped the final design more than any CAD review. Meeting them weekly kept the project moving and told me what to change next.

### Hospital equipment manufacturing
Manufacturing Intern · Seoul, May 2025 – Aug 2025

**Org:** Yuil Trading Corporation

![Wiring a suction unit's control board by hand](images/yuil-cover.jpg)

**Result:** Built and tested 250+ hospital suction units to ISO 10079, wrote a Python pipeline for flow-rate test data, and fixed oil backflow on an operating table with a printed support.

**Tools:** Python, AutoCAD, 3D Printing, Pressure Transmitters, DAQ

1. **Problem.** Almost every step on the line was manual. Units were assembled and wired by hand and used mechanical gauges, which could be assembled wrong and could only be read by eye. Test results were written on paper and varied from unit to unit.
2. **Build.** I assembled the housings and electronics for 250+ hospital suction units, wiring the control boards and mounting brackets by hand.
   ![Suction units on the line, with control boards going in](images/yuil-1-line.jpg)
   ![Mounting brackets and ground wires laid out before assembly](images/yuil-1-brackets.jpg)
3. **Test.** Each unit was tested to ISO 10079 for vacuum, free air flow, and leakage. I connected the pressure transmitters to a DAQ and wrote a Python pipeline that cleans the data, calculates suction flow rate from pressure, plots it, and flags any unit below 20 L/min. It handled 30+ units a day and caught units just under the limit that had usually been passed. About 1 to 2 units in 200 failed, 85% from assembly leaks and 15% from pumps.
4. **Fix.** A hydraulic operating table had oil flowing back through its actuator, which was traveling past the support meant to stop it. I drew a support fixture in 2D AutoCAD and 3D printed it to fit between the table and the joint, so the actuator stopped where it should. The backflow stopped, and the table ran more reliably.
   ![The operating table's lift column and actuator, with the base open](images/yuil-4-table.jpg)
5. **Takeaway.** Cost mattered more than I expected. A better technology was not chosen just because it was better, so each time the real question was how to solve the problem more cheaply, more quickly, and more cleverly.

## Research & Startup

### Hand-crank hybrid drivetrain (RAINIER V1)
In progress

**Org:** Human Dynamics and Controls Lab + Koine Adaptive

**Result:** Leading a modular series-hybrid hand-crank drivetrain for adaptive trikes, with a 48V bus, VESC field-oriented control, and CAN. Generator bench testing in progress.

**Tools:** VESC (FOC Motor Control), CAN Bus, 48V Battery and BMS, Mid-Drive Motor, Generator Test Bench

1. **Problem.** Trails demand more sustained arm power than many adaptive riders can give. A chain-driven hand cycle ties the cranks mechanically to the wheel, so the chain line, not the rider's body, decides where the cranks sit. Electric-assist conversions already exist, but they keep that mechanical link, and many take the rider out of the effort. I interviewed leaders at 15+ adaptive recreation programs across the US about how they choose, fund, and use adaptive bikes.
2. **Thinking.** The goal is to remove the mechanical link entirely and make the drivetrain modular, so it can be fitted to each rider. That points to a series hybrid. The hand cranks turn a generator, a converter feeds controlled current onto a 48V bus shared with the battery, and a VESC running field-oriented control drives a mid-drive motor. A thumb throttle sets wheel torque, so the rider still works the cranks, but the cranks can sit wherever suits the rider's body.
3. **Trade-off.** With a mid-drive motor, the wheel cannot drive the motor backward, so regenerative braking from back-EMF is not possible on this version.
4. **Build.** I have led the project since the proposal, and Prof. Elizabeth Hsiao-Wecksler reviews the design with me every week. Every module plugs into the same connector, which carries fused 48V power, CAN data, and an E-stop loop, so unplugging any module stops the motor.
5. **Test.** The current milestone is the generator bench. I am measuring voltage, frequency, and torque against cadence from 60 to 90 RPM to set the gear ratio.
6. **Next.** Next, the generator goes on the bus, and I tune the current-versus-cadence profile that sets how the cranks feel. An FMEA and bench fault-injection tests come before the first controlled ride. The program interviews did not change V1, but they are the reference for the next model.

## Student Teams

### Wheel speed sensor
Aug 2026 – Present

**Org:** Eco Illini Supermileage

![KiCAD schematic of the wheel speed sensor board](images/eco-cover.png)

**Result:** Designing a KiCAD PCB around an STM32 with isolated CAN, and a mount for a 14-bit magnetic encoder that reads wheel speed.

**Tools:** KiCAD, STM32G0B1, MA732 Magnetic Angle Encoder, ISO1044 CAN Transceiver

1. **Problem.** The team drives burn and coast. The motor runs on the straights and switches off while the car coasts through the turns. During the coast the motor encoder reads nothing, so the driver has no speed reading to decide when to burn again. The car needs a sensor on the wheel itself.
   ![The Eco Illini supermileage car in the shop](images/eco-1-car.jpg)
2. **Thinking.** I compared four ways to measure wheel speed. A Hall switch with one magnet is the simplest, but on a 20 in wheel it gives only one reading per second at 3.6 mph, which is too slow for continuous calculations. An optical encoder has more resolution, but vibration and debris from the rear wheel can scrape or block it. A coupled rotary encoder is precise but expensive, and it adds weight and resistance. A magnetic angle encoder (MA732) reads the angle of a magnet without touching it, so it gives a reading at any speed.
   ![How the magnetic encoder reads the wheel, drawn from the MA732 datasheet](images/eco-2-principle.png)
3. **Build.** I am designing a KiCAD PCB around an STM32G0B1 that counts the encoder's quadrature pulses on a hardware timer. An ISO1044 transceiver isolates the CAN bus, and data and 12 V power run between boards over RJ45 and Ethernet cable.
   ![Encoder section of the schematic, with A and B on the STM32 timer inputs](images/eco-3-schematic.png)
4. **Trade-off.** The encoder has one hard requirement. It has to sit on the axis of rotation, within 0.5 mm, at a 1.5 mm air gap from the magnet. The encoder stays stationary in the mount while the magnet sits in the wheel hub, so I am designing a sensor mount built around the existing rear wheel mount.
   ![A wheel and its hub on the team bench](images/eco-4-hub.jpg)
   ![CAD of the rear wheel mount that the sensor mount has to fit](images/eco-4-mount.png)
5. **Next.** Next I will model the board and the sensor mount in CAD, finish the board and order it for testing, 3D print the mount, and collect test data.
   ![Board design session with the team](images/eco-2-session.jpg)
6. **Also.** I also joined the body team, which will build the carbon fiber body once its design is final. So far I have learned the layup process, which starts by sanding the polyurethane foam, brushing on primer, and sanding again, then applying mold release or wax as a barrier, laying the carbon fiber, and binding it with epoxy.
   ![Sanding polyurethane foam with the body team](images/eco-5-sanding.jpg)
   ![Weighing epoxy resin and hardener](images/eco-5-epoxy.jpg)

### Shock travel logger
Project Lead · May 2026 – Present

**Org:** Off-Road Illini Baja SAE

![The Off-Road Illini Baja car on a drive, seen from behind](images/baja-cover.jpg)

**Result:** Leading a four-corner shock travel logger with linear potentiometers, an ESP32-S3, and a 12-bit ADC at 500 Hz, so damper settings come from data instead of driver feel.

**Tools:** Linear Potentiometers, ESP32-S3, MCP3208, CAN, C, Python, 3D Printing

1. **Problem.** The car runs AFCO shocks with 8 in of stroke, and damper settings have mostly been chosen by driver feel. The goal is a competition setting for all four corners that keeps the shocks from bottoming out and is backed by logged data. That requires shock travel at every corner, measured on a car that jumps and lands.
   ![One of the AFCO shocks on the car](images/baja-1-problem.jpg)
2. **Thinking.** Over the summer I researched how shock data is read. Damping force depends on how fast the shaft moves, not on where it sits in its stroke, so the useful output is a shock velocity histogram. It shows the share of a run spent in compression and rebound at low and high speed, split at a knee of 3 in/s. A balanced setup gives a roughly symmetric bell curve, which serves as a reference rather than a target. Velocity is the derivative of position, and differentiating amplifies noise, so the question that shaped the design was whether slow damper motion would survive the whole chain from sensor to filter.
   ![How to read a shock velocity histogram, illustrated with simulated data](images/baja-4-data.png)
3. **Design.** I lead the mechanical, firmware, and data subteams. Each shock gets a linear potentiometer with 10 in of stroke, held beside it by 3D printed split clamp mounts. An ESP32-S3 will sample all four corners at 500 Hz through a 12-bit SPI ADC (MCP3208). It will log to a microSD card and send the data over CAN, through the team's Universal Module Controller (UMC), to the pit computer. A Python script will turn the travel data into velocity histograms for each corner. The logger enclosure clamps to the frame tubes, with no drilling or welding.
   ![Off-Road Illini Baja SAE, fall 2026](images/baja-team.jpg)
4. **Trade-off.** The first sensor I selected cost $175 each, which was over budget. I switched to a $113.50 sensor and to a cheaper ESP32-S3 board built on the same module. The cheaper sensor is 15 in long when collapsed, longer than the shock's 14.7 in, so mounted eye to eye it would bottom out before the shock does. I designed the mounts to place its ends 33 mm farther apart than the shock eyes, which leaves about 1 in of sensor travel at each end.
5. **Signal.** Noise analysis showed that 10-bit resolution masked slow damper motion, so the potentiometers are read by an external 12-bit ADC. I ruled out the ESP32's internal converter as noisy and nonlinear. Filtering happens in two stages. An RC filter at about 106 Hz on each channel sits below the 250 Hz Nyquist limit, and a 30 Hz Butterworth filter runs forward and backward over the logged data, so there is no time shift. I will compare it with a Savitzky-Golay filter, which smooths and differentiates in one step.
   ![Simulated comparison of the same slow shock motion read through a 10-bit and a 12-bit ADC](images/baja-3-signal.png)
6. **Build.** The printed mounts, logger assembly, and wiring are in progress.
7. **Test.** Each sensor will be calibrated on the bench. The car will then run on a test track the team is building, where each section excites a known part of the histogram. A flat straight gives the baseline, a slalom and hard braking produce slow motion, and whoops, rocks, and a small jump produce fast hits and full travel. Each setting will be run three times by the same driver, with one adjustment changed at a time.
8. **Result.** Results will come with logging and tuning on the car.

### AI translation mask
Project Lead · Dec 2024 – Apr 2025

**Org:** ASME

![A visitor trying on the mask at Engineering Open House](images/mask-cover.jpg)

**Result:** Led a 10-person team to build a wearable real-time translator on a Raspberry Pi and cut its latency by 24%. 1st Place, Visionary Impact, among 200+ exhibits.

**Tools:** Raspberry Pi 4, Python, Google Cloud APIs, Streamlit, TFT Display, 3D Printing

1. **Problem.** When my family moved to Canada, my mother struggled with English. Translating on a phone meant taking it out in the middle of a conversation, which interrupted the flow, could feel impolite, and was slow. The objective was a light, wearable translator that reduces translation delay and is comfortable to wear.
2. **Thinking.** A mask keeps both hands free. An acoustic chamber inside it muffles the wearer's own voice, so the listener hears mainly the translation, and a front display shows captions. I chose a Raspberry Pi over a microcontroller for its built-in Wi-Fi, and Google Cloud for its wide language support.
   ![Concept sketch: Raspberry Pi and audio adapter on the head strap, mic and speaker inside the mask, cooling slots on the sides](images/mask-2-sketch.png)
3. **Build.** I led a team of 10 students in mask, electronics, and software groups on a $300 ASME budget. The mask was designed in CAD and 3D printed around a Raspberry Pi 4 with a microphone, speaker, TFT display, rotary encoder, and battery. We wrote the Python scripts that turn speech into translated text and audio through Google Cloud APIs, and designed the Streamlit interface that displays it. Running in the cloud over Wi-Fi, it supports more than 90 languages.
   ![Team members with the speaker, electronics, and display before assembly](images/mask-1-team.jpg)
   ![3D-printed mask frame with the display installed](images/mask-2-build.jpg)
4. **Test.** The first prototype worked, but the translation lagged. Running the captions and the spoken output in parallel and ending the recording after 0.3 s of silence reduced latency by 24%, measured with timers in the code. The rotary encoder skipped two to three languages at a time, which was fixed with software debouncing, and an amplifier was added because the speaker was too quiet.
   ![Rotary encoder driving the language selector on the display](images/mask-3-fix.jpg)
5. **Result.** The Raspberry Pi 4 failed the night before the exhibit. I drove to borrow a friend's Raspberry Pi 1, and the system was rebuilt from backup code overnight. It ran at about one-eighth of the earlier speed but worked throughout the showcase, and took 1st place in Visionary Impact among 200+ exhibits at UIUC Engineering Open House 2025.
   ![Presenting the mask to a visitor at Engineering Open House](images/mask-4-demo.jpg)
   ![The mask beside the Visionary Impact 1st place award](images/mask-4-award.jpg)
6. **Takeaway.** The prototype was bulkier than planned and built on a tight budget, but it proved the concept, and it showed me that I could build something real and lead a team through it.

### Adaptive Gravel E-Trike
Footplate Design · Sep 2024 – Mar 2026

**Org:** ASME + Koine Adaptive

![The Adaptive Gravel E-Trike](images/trike-cover.jpg)

**Result:** Designed and built a pin-locked trike footplate with CNC machining and TIG welding that adjusts in under 30 seconds. 1st Place, Most Industry Impact, among 200+ exhibits.

**Tools:** CAD, ANSYS FEA, CNC Machining, TIG Welding, Sheet Metal Forming

1. **Problem.** An adaptive off-road trike is shared by riders with different leg lengths. Its footplate has to adjust in under 30 seconds with minimal tools, survive hard impacts on rough ground, and keep ground clearance at every position.
2. **Thinking.** The trike started with a single bar as a footrest. Our team of three replaced it with a sheet metal bucket held by slots and clamps, which later proved heavy and unsafe, restricted the ankle, and slipped on bumpy ground. The second version therefore locks by shape instead of friction, with an inner tube pinned inside the frame tube.
   ![The original footrest bar at Engineering Open House](images/trike-1-bar.jpg)
3. **Build.** On the first version I was one of three designers and sized the Velcro foot straps and laser cut prototype parts. The second version I designed and built alone at Koine Adaptive. I CNC-machined the pedal connector and TIG-welded it to a 6061 aluminum rod that slides into the frame tube. Five pin positions, chosen from NASA anthropometric data, cover a wide range of leg lengths, and a strapped pedal lets the ankle move.
   ![Version 1 CAD, sheet metal foot buckets clamped to a steel bar](images/trike-1-v1.png)
   ![Version 2 CAD, the inner rod with its pin holes and pedal mount](images/trike-2-cad.png)
   ![TIG welding practice](images/trike-2-weld.jpg)
   ![Sketch sizing the footplate and the Velcro foot strap](images/trike-1-sketch2.png)
4. **Test.** The first version was checked in ANSYS under more than 10 static load cases for stress below yield and no slip at the adjustment. The second rod was sized by hand calculation against landing loads, then ridden by the founder before other riders tried it.
   ![Rod and pedals in the frame tube, with the pin holes visible](images/trike-2-rod.jpg)
   ![Version 2 under a rider's feet](images/trike-3-fit.jpg)
5. **Result.** The trike took 1st place in Most Industry Impact and 2nd place in Outstanding RSO among 200+ exhibits at UIUC Engineering Open House 2025. The second version adjusts in under 30 seconds. At a pilot demo with Ozark Adaptive Sports Association, wheelchair users found it easier to adjust and comfortable to ride.
   ![The team with the 1st place award at Engineering Open House 2025](images/trike-4-eoh.jpg)
   ![Riding the trike on a gravel trail](images/trike-4-ride.jpg)
6. **Takeaway.** A part that holds up in analysis can still fail the person using it. I learned to start from the rider's comfort and to choose a joint that locks by shape over one that relies on friction.

### Follow-me gym robot
Built with classmates · Sep 2024 – Jul 2025

**Result:** Built a four-wheel robot with I2C motor control, wheel encoders, and 2D LiDAR obstacle avoidance, designed to follow its user with UWB.

**Tools:** Arduino, I2C Motor Driver, Wheel Encoders, 2D LiDAR, UWB, Raspberry Pi

1. **Problem.** Moving between machines at the gym means carrying a bag, a water bottle, and a towel everywhere. The goal was a small robot that uses UWB to follow its user and carries those things.
2. **Thinking.** The idea grew out of the autonomous wheelchair I built in high school, which used a Raspberry Pi for high-level decisions and an Arduino for low-level motor control. This time the robot had to follow a moving person instead of a fixed route, so UWB replaced the camera as the way to locate the target.
3. **Build.** I assembled the four-wheel chassis and wired the four-channel motor driver. I wrote the Arduino code that sets each motor's speed over I2C and reads the wheel encoders, and I worked on obstacle detection with the 2D LiDAR.
   ![Top view of the chassis with the 2D LiDAR at the front, from the manufacturer drawing](images/gym-3-lidar.png)
4. **Result.** The robot drove on its own and steered around obstacles in its path.
5. **Takeaway.** The hard problems showed up after it worked. The wiring needed to be tidied, and the robot had to stay small enough not to block people in a busy gym. A 2D LiDAR only scans one flat slice, and from where it was mounted it could not see everything in front of the robot, so deciding where to put it and finding the blind spots was harder than getting it to move. Next time I would plan sensor placement and wiring before building the chassis.

# How I Work

### The night I learned we could do it

![The Raspberry Pi warning about low voltage the night before the exhibit](images/work-eoh-night.jpg)

As a freshman with no CAD, welding, or soldering experience, I led a team of ten on the AI translation mask, and I often doubted I was the right lead. The night before Engineering Open House, our Raspberry Pi died. We found an old Raspberry Pi 1, rebuilt the system overnight from my backup, and took 1st place among 200+ exhibits.

I still remember the rush when the mask spoke its first translation on that borrowed board.

> I can do this, and we can do this.

### Now I try to give others that moment

![ASME Special Projects with our homecoming float](images/work-asme-float.jpg)

As ASME's Director of Special Projects, I oversaw 6 projects and recruited 70+ members, many of them new to engineering like I had been. What I watched most closely was whether each person had something real to build. I lead the shock logger on Baja the same way.

> I want everyone I work with to have a night like that.

# Beyond the Bench

Trade shows, events, and the conversations that shaped how I think about engineering.

# Let's Build Something

**Headline:** Have a mechanism that needs a sensor and a control loop?

I'm looking for an internship or co-op for Fall 2026, Spring 2027, or Summer 2027 in controls, embedded systems, mechatronics, or quality engineering. If something here connects to what your team is working on, I'd like to hear about it.

**Primary button:** Explore My Projects

**Secondary button:** Get in Touch
