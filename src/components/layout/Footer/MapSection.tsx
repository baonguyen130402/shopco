"use client";

import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

// Dynamically import Leaflet to avoid SSR issues
const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const initializeMap = async () => {
      // Dynamically import Leaflet
      const L = await import('leaflet');

      // Import Leaflet CSS dynamically
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
      }

      // Fix default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      if (mapRef.current && !mapInstanceRef.current) {
        // TPHOME coordinates
        const lat = 10.944295;
        const lng = 107.065715;

        // Create map
        const map = L.map(mapRef.current, {
          center: [lat, lng],
          zoom: 15,
          zoomControl: true,
          scrollWheelZoom: false,
        });

        // Add tile layer
        L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          attribution: 'Google Maps',
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          maxZoom: 19,
        }).addTo(map);

        // Beautiful custom marker icon with TPHOME logo
        const customIcon = L.divIcon({
          html: `
            <div class="beautiful-marker" style="
              position: relative;
              width: 70px;
              height: 70px;
              animation: gentleBounce 3s infinite ease-in-out;
            ">
              <!-- Pulsing ring effect -->
              <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 90px;
                height: 90px;
                border: 2px solid #22c55e;
                border-radius: 50%;
                animation: ripple 2.5s infinite;
                opacity: 0.7;
              "></div>
              
              <!-- Outer glow ring -->
              <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 70px;
                height: 70px;
                background: radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%);
                border-radius: 50%;
                animation: glow 2s infinite alternate;
              "></div>
              
              <!-- Main marker pin -->
              <div style="
                position: relative;
                background: linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%);
                width: 52px;
                height: 52px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 
                  0 6px 20px rgba(34, 197, 94, 0.4),
                  0 3px 10px rgba(0, 0, 0, 0.3),
                  inset 0 1px 3px rgba(255, 255, 255, 0.4),
                  inset 0 -1px 2px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 9px;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              ">
                <!-- Logo container with premium glass effect -->
                <div style="
                  transform: rotate(45deg);
                  width: 34px;
                  height: 34px;
                  backdrop-filter: blur(12px);
                  border-radius: 6px;
                  border: 1px solid rgba(255, 255, 255, 0.9);
                  box-shadow: 
                    0 2px 12px rgba(0, 0, 0, 0.15),
                    inset 0 1px 3px rgba(255, 255, 255, 0.9),
                    inset 0 -1px 2px rgba(0, 0, 0, 0.05);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                  overflow: hidden;
                ">
                  <!-- TPHOME Logo -->
                  <div style="
                    width: 26px;
                    height: 26px;
                    background-image: url('/icons/tphome.png');
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    filter: 
                      drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2))
                      contrast(1.1)
                      brightness(1.05);
                  "></div>
                  
                  <!-- Premium glass shine effect -->
                  <div style="
                    position: absolute;
                    top: -100%;
                    left: -100%;
                    width: 300%;
                    height: 300%;
                    background: linear-gradient(
                      45deg, 
                      transparent 25%, 
                      rgba(255, 255, 255, 0.4) 45%, 
                      rgba(255, 255, 255, 0.6) 50%, 
                      rgba(255, 255, 255, 0.4) 55%, 
                      transparent 75%
                    );
                    animation: elegantShine 4s infinite;
                    pointer-events: none;
                  "></div>
                </div>
              </div>
              
              <!-- Elegant shadow -->
              <div style="
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 25px;
                height: 10px;
                background: radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                filter: blur(2px);
                animation: shadowPulse 3s infinite ease-in-out;
              "></div>
            </div>
            
            <style>
              @keyframes ripple {
                0% { 
                  transform: translate(-50%, -50%) scale(0.6); 
                  opacity: 0.8; 
                  border-width: 3px;
                }
                50% { 
                  transform: translate(-50%, -50%) scale(1.0); 
                  opacity: 0.4; 
                  border-width: 2px;
                }
                100% { 
                  transform: translate(-50%, -50%) scale(1.3); 
                  opacity: 0; 
                  border-width: 1px;
                }
              }
              
              @keyframes glow {
                0% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.95); }
                100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
              }
              
              @keyframes gentleBounce {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-6px) scale(1.02); }
              }
              
              @keyframes elegantShine {
                0% { transform: translateX(-150%) translateY(-150%) rotate(45deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateX(150%) translateY(150%) rotate(45deg); opacity: 0; }
              }
              
              @keyframes shadowPulse {
                0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.3; }
                50% { transform: translateX(-50%) scale(1.1); opacity: 0.2; }
              }
              
              .beautiful-marker:hover {
                transform: scale(1.08) !important;
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
              
              .beautiful-marker:hover > div:nth-child(3) {
                box-shadow: 
                  0 8px 25px rgba(34, 197, 94, 0.5),
                  0 4px 15px rgba(0, 0, 0, 0.4),
                  inset 0 1px 3px rgba(255, 255, 255, 0.5),
                  inset 0 -1px 2px rgba(0, 0, 0, 0.1);
              }
            </style>
          `,
          className: 'custom-tphome-marker',
          iconSize: [70, 70],
          iconAnchor: [35, 65],
        });

        // Add marker
        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

        // Add popup
        marker.bindPopup(`
          <div style="text-align: center; min-width: 200px;">
            <h3 style="font-weight: bold; margin-bottom: 8px; color: #1f2937;">TPHOME</h3>
            <p style="margin-bottom: 4px; color: #6b7280;">Gạch Ốp Lát & Nội Thất Cao Cấp</p>
            <p style="margin-bottom: 8px; color: #6b7280;">📍 Trảng Bom, Đồng Nai</p>
            <div style="font-size: 12px; color: #9ca3af;">
              <p>📞 0779 89 0789</p>
              <p>🕒 7:30 - 21:00 (T2-CN)</p>
            </div>
          </div>
        `);

        mapInstanceRef.current = map;

        // Enable scroll wheel zoom on click
        map.on('click', () => {
          map.scrollWheelZoom.enable();
        });

        // Disable scroll wheel zoom when mouse leaves
        map.on('mouseout', () => {
          map.scrollWheelZoom.disable();
        });
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="flex flex-col w-full z-0" style={{ gridColumn: '1 / -1', maxWidth: 'none' }}>
      {/* Map Container */}
      <div className="mb-6">
        <div
          ref={mapRef}
          className="w-full h-48 md:h-56 rounded-lg overflow-hidden border border-gray-200 shadow-sm"
          style={{ minHeight: '264px' }}
        />
      </div>

      {/* Store Information */}
    </section>
  );
};

export default MapSection;
