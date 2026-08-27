import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Button } from "react-bootstrap";

function Scanner({ onScan }) {
    const videoRef = useRef(null);
    const readerRef = useRef(null);
    const controlsRef = useRef(null);

    const [error, setError] = useState(null);
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        const reader = new BrowserMultiFormatReader();
        readerRef.current = reader;

        return () => {
            controlsRef.current?.stop();
        };
    }, []);

    const startScanner = async () => {
        setError(null);
        setScanning(true);

        try {
            const devices = await BrowserMultiFormatReader.listVideoInputDevices();

            if (!devices.length) {
                throw new Error("No camera found.");
            }

            // Prefer the rear camera on phones.
            const device =
                devices.find((d) =>
                    /back|rear|environment/i.test(d.label)
                ) || devices[devices.length - 1];

            controlsRef.current = await readerRef.current.decodeFromVideoDevice(
                device.deviceId,
                videoRef.current,
                (result, error) => {
                    if (result) {
                        console.debug("Barcode data:", result);
                        const value = result.getText();

                        onScan?.(value);

                        // Stop after the first successful scan.
                        controlsRef.current?.stop();
                        setScanning(false);
                    }

                    // Not finding a barcode on every frame is normal.
                    // Only surface actual camera/decoder errors if needed.
                }
            );
        } catch (err) {
            console.error(err);
            setError(err.message || "Unable to access the camera.");
            setScanning(false);
        }
    };

    const stopScanner = () => {
        controlsRef.current?.stop();
        setScanning(false);
    };

    return (
        <div style={{ maxWidth: 500 }}>
        <div
            style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 12,
            background: "#000",
            aspectRatio: "4 / 3",
            }}
        >
            <video
            ref={videoRef}
            muted
            playsInline
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }}
            />

            {scanning && (
            <div
                style={{
                position: "absolute",
                inset: "20%",
                border: "3px solid white",
                borderRadius: 8,
                pointerEvents: "none",
                }}
            />
            )}
        </div>

        {!scanning ? (
            <Button onClick={startScanner} variant="primary">
            Scan barcode
            </Button>
        ) : (
            <Button onClick={stopScanner} variant="danger">
            Stop
            </Button>
        )}

        {error && (
            <p style={{ color: "crimson" }}>
            {error}
            </p>
        )}
        </div>
    );
}

Scanner.propTypes = {
    onScan: PropTypes.func.isRequired,
};

export default Scanner;