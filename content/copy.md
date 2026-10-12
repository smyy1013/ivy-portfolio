# Hero

**Headline:** Ivy Yoon

**Tagline:** Metal that moves. Signals that steer.

**Role:** Mechanical engineering junior · UIUC | Electrical engineering minor

**Subtitle:** The work I like most happens where a mechanism meets a sensor and a controller.

**Primary button:** See What I've Built

**Secondary button:** Download Resume

# What I Build

> Layout: each project is told as an engineering process. A stage is a numbered line, "1. **Label.** text", followed by zero or more pictures. Stages labelled Thinking, Trade-off, or Takeaway are highlighted as the reasoning behind the work.

## Internships

### Automatic sand dispenser
Littelfuse, Engineering Intern · May to Aug 2026

![Sand flowing from the dispensing tip into the 3D-printed fixture](images/dispense-cover.jpg)

**Result:** Fill time reduced by 37% while maintaining fill weight.

**Tools:** Autodesk Inventor, 3D Printing, Pneumatics, Arduino Opta PLC, Load Cell, FEA

1. **Problem.** Sand fills many electrical fuses. When a fuse operates, the sand absorbs the heat of the arc and helps extinguish it, so consistent packing is important to fuse performance. The existing gravity-fed process was slow, ran one fuse at a time, and required fixture changes between fuse types. The objective was to find a more efficient dispensing method while maintaining consistent filling and compaction.
   ![CMV sand-fill machine](images/dispense-1-problem.jpg)
   ![8-station sand-fill station](images/dispense-1-station.jpg)
2. **Thinking.** The initial assumption was that faster filling required more dispensing force. Testing the first concept showed otherwise. The nozzle opening was already large enough for sand to pass, so force was not the limiting factor. The design therefore shifted from dispensing force to air-assisted gravity dispensing.
3. **Build.** The first prototype was a pneumatic piston metering chamber with a target volume accuracy of ±5%. The abrasive sand wore the piston, cylinder, and seals, with noticeable degradation after approximately 7 trials, and the concept was abandoned. The second build was a 3D-printed fixture with interchangeable dispensing tips, which allowed each variable to be tested independently.
   ![CAD of the fuse fixture from the initial concept](images/dispense-2-build.jpg)
   ![Initial experimental setup: the piston-based metering chamber on the 3D-printed fixture](images/dispense-2-piston.jpg)
4. **Test.** Gravity-only and air-assisted filling were compared, along with tip geometry and vibration level. For each trial, fill time to a target height was taken from video and the fuse was weighed before and after. Compaction tapping was manual, which is a known source of variability.
   ![Experimental setup: sand hopper, dispensing tip, and 3D-printed fixture](images/dispense-3-tune.jpg)
5. **Result.** Average fill time decreased from 33.2 s to 20.9 s, a 37% reduction, while fill weight was maintained within about 1%. Process settings are proprietary to Littelfuse and are not listed here.
   ![Sand flow by gravity alone](images/dispense-4-gravity.jpg)
   ![Sand flow with air assist](images/dispense-4-air.jpg)
6. **Automation.** To run the process without an operator, delivered mass was selected as the control signal, since the fuse has to be weighed to verify the fill in any case. Unlike timing-based filling, the controller can stop when the target weight is reached. I programmed the fill sequence on an Arduino Opta PLC and read the load cell at 16-bit resolution, because a 12-bit reading across a multi-kilogram load cell resolves only about a gram per count, which is too coarse for a fill of under 100 g. The sequence ran successfully, and the hopper was checked under load using FEA. The hopper and other mechanical parts were not fully rebuilt before the internship ended, and the output circuit still needs fuses.
   ![Control circuit: the load cell signal goes to the PLC, which switches the valves and the vibration motor](images/dispense-2-wiring.png)
7. **Takeaway.** Better filling did not come from more mechanical force. Finding that out early shaped the rest of the project, and working within three months taught me how to define a scope that can be finished.

### Lab and X-ray test fixtures
Littelfuse, Engineering Intern · May to Aug 2026

![Snap-fit quick-release rail on the X-ray fixture](images/lab-cover.jpg)

**Result:** X-ray rail changeover reduced by 80%, from 60 s to 12 s.

**Tools:** Autodesk Inventor, 3D Printing, 8020 Aluminum Extrusion, Snap-Fit Design

1. **Problem.** Fuses in the Low Power Lab are tested for temperature rise under IEC and UL standards, vertically for one and horizontally for the other, and are then inspected by X-ray. The existing fixtures were product-specific. Technicians stacked blocks to set fuse height for UL tests, held cables with cable ties, and changed X-ray rails with a bolt and nut in five steps, about 60 seconds each time.
   ![Blocks and cable ties in the old UL setup](images/lab-1-ul.jpg)
   ![Screw adjustment on the old X-ray fixture](images/lab-1-xray.jpg)
2. **Thinking.** Both fixtures needed to adjust without tools. For the lab fixture, the 8020 frame was kept, but the lower rack was made to slide and lock with clamping handles. For the X-ray rails, a toggle clamp strong enough would not fit the machine bed, so I borrowed the snap lock of a food container and chose a spherical snap fit, which engages and releases smoothly and spreads the load.
   ![Spherical snap fit, from insertion to recovery](images/lab-2-snap.png)
3. **Build.** All parts were 3D printed so each change could be tested within hours. The cable holder went through three versions, from open slots, to interchangeable snap-fit holders, to a single rotating insert with several cable sizes. Humid weather printed the T-slot features oversized, so the tolerances were adjusted over several prints. A snap-fit hinge kept fracturing and was dropped.
   ![The adjustable lab test fixture](images/lab-3-frame.jpg)
   ![Three versions of the cable holder](images/lab-3-cable.png)
4. **Test.** Lab technicians reviewed each version every week. Their feedback resized the snap fit, added holders for UL cables, and replaced a sliding blade-fuse spacer that did not grip firmly with a scissor linkage. X-ray changeover was timed over 10 trials.
   ![Scissor-linkage spacers holding blade fuses](images/lab-3-blade.jpg)
5. **Result.** X-ray rail changeover went from five steps to three, and from about 60 seconds to 12. One adjustable fixture now covers several fuse families and takes less storage space. A lever-driven mechanism for rotating fuses 90° in the X-ray was designed but not built.
   ![The quick-release rail snapped onto the base](images/lab-5-release.jpg)
6. **Takeaway.** The technicians who used the fixtures every day shaped the final design more than any CAD review. Meeting them weekly kept the project moving and showed me what to change next.

### Laser-labeling automation
Littelfuse, Engineering Intern · May to Aug 2026

![The printed labeling fixture on the laser bed](images/label-cover.jpg)

**Result:** 100 samples labeled in about 30 minutes, unattended.

**Tools:** Excel VBA, Autodesk Inventor FEA, 3D Printing, PETG, Trotec Ruby

1. **Problem.** Every engineering sample needs a unique sample number and its ratings before testing. Labels were handwritten or entered into the laser software one by one, small fuses were hard to mark consistently, and each fuse family had its own laser fixture.
   ![One of the old single-family laser fixtures](images/label-1-old.jpg)
2. **Thinking.** The work split into a fixture and a program. The laser software could not be scripted, and a separate scripting platform would have been harder to maintain, so I wrote an Excel VBA tool that prepares the data while template selection and job submission stay in the existing laser software.
3. **Build.** The fixture holds several fuse families in one setup and was checked in Inventor FEA under loads applied at each slot. Triangular bridges and a flat middle support reduced the deflection seen over unsupported spans, and the part was split to fit the printer bed and printed in PETG, which is less brittle than PLA. The VBA tool checks every input, looks up fuse dimensions in a database, numbers the samples, and exports a CSV that the laser software reads through Dynamic Data.
   ![FEA of the first fixture design](images/label-3-fea.png)
   ![FEA after adding triangular bridges](images/label-3-fea2.png)
   ![The Excel VBA input page](images/label-3-excel.png)
4. **Test.** Early simulations showed exaggerated deflection along one edge, which traced back to boundary conditions and contact detection rather than the design, and the setup was corrected before comparing iterations. A rotary attachment was also tested for round fuses, but it held fewer samples per run and needed extra hardware.
   ![Label from the rotary attachment test](images/label-4-rotary.jpg)
5. **Result.** Labeling 100 samples takes about 30 minutes, similar to before, but it now runs unattended, so technicians spend that time on other work. Manual sample numbering is gone and labels are consistent. A waterjet-cut aluminum fixture was designed for a future version.
   ![Laser-labeled engineering samples in the fixture](images/label-5-samples.jpg)
6. **Takeaway.** The most capable option is not always the right one. A tool that lab staff can maintain and extend after I leave was worth more than a more powerful script only I understood.

### Hospital suction units
Yuil Trading Corporation, Manufacturing Intern · Seoul, May to Aug 2025

![Wiring a suction unit's control board by hand](images/yuil-cover.jpg)

**Result:** 250+ units built and tested to ISO 10079, with test data analyzed by a Python pipeline instead of by hand.

**Tools:** Python, AutoCAD, 3D Printing, Pressure Transmitters, DAQ

1. **Problem.** Almost every step on the line was manual. Units were assembled and wired by hand, and they used mechanical gauges, which could be assembled wrong and could only be read by eye. Test results were written down on paper, and they varied from unit to unit.
2. **Build.** I assembled housings and electronics for 250+ hospital suction units.
   ![Mounting brackets and ground wires laid out before assembly](images/yuil-1-brackets.jpg)
3. **Test.** Each unit was tested to ISO 10079 for vacuum, free air flow, and leakage. I connected the pressure transmitters to a DAQ and wrote a Python pipeline that cleans the data, calculates suction flow rate from pressure, plots it, and flags units below 20 L/min. It handled 30+ units a day and caught units just under the limit that had usually been passed. About 1 to 2 units in 200 failed, 85% from assembly leaks and 15% from pumps.
4. **Fix.** A hydraulic operating table had oil flowing back through its actuator. The actuator was traveling farther than it should have, past the support meant to stop it. I drew a support fixture in 2D AutoCAD and 3D printed it to fit between the table and the joint, so the actuator stopped where it should. The backflow stopped, and the table ran more reliably.
   ![The operating table's lift column and actuator, with the base open](images/yuil-4-table.jpg)
5. **Takeaway.** Cost mattered more than I expected. A better technology was not chosen just because it was better, so the real question each time was how to solve the problem more cheaply, more quickly, and more cleverly.

## Research & Startup

### Hand-crank hybrid drivetrain (RAINIER V1)
Human Dynamics and Controls Lab + Koine Adaptive · In progress

**Result:** Drivetrain architecture set. Generator bench testing in progress.

**Tools:** VESC (FOC Motor Control), CAN Bus, 48V Battery and BMS, Mid-Drive Motor, Generator Test Bench

1. **Problem.** Trails demand more sustained arm power than many adaptive riders can give. A chain-driven hand cycle ties the cranks mechanically to the wheel, so crank position is set by the chain line, not by the rider's body. Electric-assist conversions already exist, but they keep that mechanical link, and many take the rider out of the effort. I interviewed leaders at 15+ adaptive recreation programs across the US about how adaptive bikes are chosen, funded, and used.
2. **Thinking.** The goal is to remove the mechanical link entirely and make the drivetrain modular, so it can be customized to each rider. That points to a series hybrid. The hand cranks turn a generator, a converter feeds controlled current onto a 48V bus shared with the battery, and a VESC running field-oriented control drives a mid-drive motor. A thumb throttle sets wheel torque, so the rider still works the cranks, but the cranks can sit wherever suits the rider's body.
3. **Trade-off.** With a mid-drive motor, the wheel cannot drive the motor back, so regenerative braking from back-EMF is not possible on this version.
4. **Build.** I have run the project from the proposal on, and Prof. Elizabeth Hsiao-Wecksler reviews the design with me every week. Every module plugs into the same connector, which carries fused 48V power, CAN data, and an E-stop loop. Unplugging any module stops the motor.
5. **Test.** The current milestone is the generator bench: measuring voltage, frequency, and torque against cadence at 60 to 90 RPM to set the gear ratio.
6. **Next.** Putting the generator on the bus and tuning the current-versus-cadence profile that sets crank feel, then an FMEA and bench fault-injection tests before the first controlled ride. The program interviews did not change V1, but they are the reference for the next model.

## Student Teams

### Wheel speed sensor
Eco Illini Supermileage · Aug 2026 to present

![KiCAD schematic of the wheel speed sensor board](images/eco-cover.png)

**Result:** PCB and mount for a 14-bit magnetic encoder that reads wheel speed.

**Tools:** KiCAD, STM32G0B1, MA732 Magnetic Angle Encoder, ISO1044 CAN Transceiver

1. **Problem.** The team drives burn and coast. The motor runs on the straights, then switches off while the car coasts through the turns. The motor encoder reads nothing during the coast, so the driver has no speed to tell when to burn again. The car needs a sensor on the wheel itself.
   ![The Eco Illini supermileage car in the shop](images/eco-1-car.jpg)
2. **Thinking.** I compared four ways to measure wheel speed. A Hall switch with one magnet is the simplest, but on a 20 in wheel it gives only one reading per second at 3.6 mph, which is too slow for continuous calculations. An optical encoder has more resolution, but vibration and debris from the rear wheel can scrape or block it. A coupled rotary encoder is precise but expensive, and it adds weight and resistance. A magnetic angle encoder (MA732) reads the angle of a magnet without touching it, so it gives a reading at any speed.
   ![How the magnetic encoder reads the wheel, drawn from the MA732 datasheet](images/eco-2-principle.png)
3. **Build.** I am designing a KiCAD PCB around an STM32G0B1 that counts the encoder's quadrature pulses on a hardware timer. An ISO1044 transceiver isolates the CAN bus, and data and 12 V power run between boards over RJ45 and Ethernet cable.
   ![Encoder section of the schematic, with A and B on the STM32 timer inputs](images/eco-3-schematic.png)
4. **Trade-off.** The encoder has one hard requirement. It has to sit on the axis of rotation, within 0.5 mm, at a 1.5 mm air gap from the magnet. The encoder stays stationary in the mount while the magnet sits in the wheel hub, so I am designing a sensor mount built around the existing rear wheel mount.
   ![A wheel and its hub on the team bench](images/eco-4-hub.jpg)
   ![CAD of the rear wheel mount that the sensor mount has to fit](images/eco-4-mount.png)
5. **Next.** Model the board and the sensor mount in CAD, finish the board and order it for testing, 3D print the mount, then collect test data.
   ![Board design session with the team](images/eco-2-session.jpg)
6. **Also.** I joined the body team, which will build the carbon fiber body once its design is finished. So far I have learned the process. Sand the polyurethane foam, brush on primer, sand again, apply mold release or wax as a barrier, lay the carbon fiber, and bind it with epoxy.
   ![Sanding polyurethane foam with the body team](images/eco-5-sanding.jpg)
   ![Weighing epoxy resin and hardener](images/eco-5-epoxy.jpg)

### Shock travel logger
Off-Road Illini Baja SAE, Project Lead · May 2026 to present

![The Off-Road Illini Baja car on a drive, seen from behind](images/baja-cover.jpg)

**Result:** Shock travel logger for all four corners, designed around a 12-bit ADC sampled at 500 Hz.

**Tools:** Linear Potentiometers, ESP32-S3, MCP3208, CAN, C, Python, 3D Printing

1. **Problem.** The car runs AFCO shocks with 8 in of stroke, and damper settings have mostly been chosen by driver feel. The goal is a competition setting for all four corners that keeps the shocks from bottoming out and is backed by logged data. That requires shock travel at every corner, measured on a car that jumps and lands.
   ![One of the AFCO shocks on the car](images/baja-1-problem.jpg)
2. **Thinking.** I researched how shock data is read over the summer. Damping force depends on how fast the shaft moves, not on where it sits in its stroke, so the useful output is a shock velocity histogram. It shows the share of a run spent in compression and rebound at low and high speed, split at a knee of 3 in/s. A balanced setup gives a roughly symmetric bell curve, which serves as a reference and not a target. Velocity is the derivative of position, and differentiating amplifies noise, so the question that shaped the design was whether slow damper motion would survive the whole chain from sensor to filter.
   ![How to read a shock velocity histogram, illustrated with simulated data](images/baja-4-data.png)
3. **Design.** I lead the mechanical, firmware, and data subteams. Each shock gets a linear potentiometer with 10 in of stroke, held beside it by 3D printed split clamp mounts. An ESP32-S3 will sample all four corners at 500 Hz through a 12-bit SPI ADC (MCP3208). It will log to a microSD card and send the data over CAN, through the team's Universal Module Controller (UMC), to the pit computer. A Python script will turn the travel data into velocity histograms for each corner. The logger enclosure clamps to the frame tubes, with no drilling or welding.
   ![Off-Road Illini Baja SAE, fall 2026](images/baja-team.jpg)
4. **Trade-off.** The first sensor selected cost $175 each, which was too much for the budget. I moved to a $113.50 sensor and to a cheaper ESP32-S3 board built on the same module. The cheaper sensor is 15 in long when collapsed, longer than the shock's 14.7 in, so mounted eye to eye it would bottom out before the shock does. The mounts therefore place its ends 33 mm farther apart than the shock eyes, which leaves about 1 in of sensor travel at each end.
5. **Signal.** Noise analysis showed 10-bit resolution masked slow damper motion, so the potentiometers are read by an external 12-bit ADC. The ESP32's internal converter was ruled out as noisy and nonlinear. The design filters in two stages. An RC filter at about 106 Hz on each channel sits below the 250 Hz Nyquist limit, and a 30 Hz Butterworth filter runs over the logged data forward and backward, so there is no time shift. I will compare it with a Savitzky-Golay filter, which smooths and differentiates in one step.
   ![Simulated comparison of the same slow shock motion read through a 10-bit and a 12-bit ADC](images/baja-3-signal.png)
6. **Build.** In progress, covering the printed mounts, logger assembly, and wiring.
7. **Test.** Planned. Each sensor is calibrated on the bench, then the car runs on a test track the team will build so that each section excites a known part of the histogram. A flat straight gives the baseline, a slalom and hard braking produce slow motion, and whoops, rocks, and a small jump produce fast hits and full travel. Each setting is run three times by the same driver, with one adjustment changed at a time.
8. **Result.** To come with logging and tuning on the car.

### AI translation mask
American Society of Mechanical Engineers, Project Lead · Dec 2024 to Apr 2025

![A visitor trying on the mask at Engineering Open House](images/mask-cover.jpg)

**Result:** Translation latency reduced by 24%. 1st place, Visionary Impact, among 200+ exhibits.

**Tools:** Raspberry Pi 4, Python, Google Cloud APIs, Streamlit, TFT Display, 3D Printing

1. **Problem.** When my family moved to Canada, my mother struggled with English. Translating on a phone meant taking it out in the middle of a conversation, which interrupted the flow, could feel impolite, and was slow. The objective was a light, wearable translator that reduces translation delay and is comfortable to wear.
2. **Thinking.** A mask keeps both hands free. An acoustic chamber inside it reduces the wearer's own voice, so the listener hears mainly the translation, and a front display shows captions. A Raspberry Pi was chosen over a microcontroller for its built-in Wi-Fi, and Google Cloud for its wide language support.
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
ASME and Koine Adaptive, Footplate Design · Sep 2024 to Mar 2026

![The Adaptive Gravel E-Trike](images/trike-cover.jpg)

**Result:** Footplate adjusts in under 30 seconds. 1st place, Most Industry Impact, among 200+ exhibits.

**Tools:** CAD, ANSYS FEA, CNC Machining, TIG Welding, Sheet Metal Forming

1. **Problem.** An adaptive off-road trike is shared by riders with different leg lengths. Its footplate has to adjust in under 30 seconds with minimal tools, survive hard impacts on rough ground, and keep ground clearance at every position.
2. **Thinking.** The trike started with a single bar as a footrest. Our team of three replaced it with a sheet metal bucket held by slots and clamps, which later proved heavy and unsafe, restricted the ankle, and slipped on bumpy ground. The second version therefore locks by shape instead of friction, with an inner tube pinned inside the frame tube.
   ![The original footrest bar at Engineering Open House](images/trike-1-bar.jpg)
3. **Build.** On the first version I was one of three designers and sized the Velcro foot straps and laser cut prototype parts. The second version I designed and built alone at Koine Adaptive. I CNC-machined the pedal connector and TIG-welded it to a 6061 aluminum rod that slides into the frame tube. Five pin positions, chosen from NASA anthropometric data, cover a wide range of leg lengths, and a strapped pedal lets the ankle move.
   ![Version 1 CAD, sheet metal foot buckets clamped to a steel bar](images/trike-1-v1.png)
   ![Version 2 CAD, the inner rod with its pin holes and pedal mount](images/trike-2-cad.png)
   ![TIG welding practice](images/trike-2-weld.jpg)
4. **Test.** The first version was checked in ANSYS under more than 10 static load cases for stress below yield and no slip at the adjustment. The second rod was sized by hand calculation against landing loads, then ridden by the founder before other riders tried it.
   ![Version 2 under a rider's feet](images/trike-3-fit.jpg)
   ![Rod and pedals in the frame tube, with the pin holes visible](images/trike-2-rod.jpg)
5. **Result.** The trike took 1st place in Most Industry Impact and 2nd place in Outstanding RSO among 200+ exhibits at UIUC Engineering Open House 2025. The second version adjusts in under 30 seconds. At a pilot demo with Ozark Adaptive Sports Association, wheelchair users found it easier to adjust and comfortable to ride.
   ![The team with the 1st place award at Engineering Open House 2025](images/trike-4-eoh.jpg)
   ![Riding the trike on a gravel trail](images/trike-4-ride.jpg)
6. **Takeaway.** A part that holds up in analysis can still fail the person using it. I learned to start from the rider's comfort and to choose a joint that locks by shape over one that relies on friction.

# How I Work

### The night I learned we could do it

I led the AI translation mask as a freshman with no CAD, welding, or soldering background, and for most of it I kept asking why I couldn't be a better lead. The night before Engineering Open House our Raspberry Pi died. A teammate found a replacement at 10 pm, I loaded the code I had backed up, and we took 1st place. That night was the first time I felt it for real: I can do this, and we can do this.

### Now I try to give others that moment

![Building a hub-motor frame with ASME Special Projects](images/work-asme.jpg)

As ASME's Director of Special Projects, I oversaw 6 projects and recruited 70+ members. What I watched most closely was whether each new person had something real to build, so they could have their own "we can do this."

# Let's Build Something

**Headline:** Have a mechanism that needs a sensor and a control loop?

I'm looking for an internship or co-op for Fall 2026, Spring 2027, or Summer 2027 in controls, embedded systems, mechatronics, or quality engineering. If something here connects to what your team is working on, I'd like to hear about it.

**Primary button:** Explore My Projects

**Secondary button:** Get in Touch
