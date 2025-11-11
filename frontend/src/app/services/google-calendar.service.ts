import { Injectable } from '@angular/core';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private readonly CLIENT_ID = '462658888931-l9fa8lq9s8ifbhvi5r5iict6ls5or5h1.apps.googleusercontent.com';
  private readonly SCOPES = 'https://www.googleapis.com/auth/calendar';

  private tokenClient: any;
  private accessToken: string = '';
  private isInitialized = false;

  constructor() {
    this.loadTokenForCurrentUser();
  }

  private loadTokenForCurrentUser() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const user = JSON.parse(usuario);
      const tokenKey = `google_token_${user.id}`;
      const savedToken = localStorage.getItem(tokenKey);
      if (savedToken) {
        this.accessToken = savedToken;
      }
    }
  }

  private saveTokenForCurrentUser(token: string) {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const user = JSON.parse(usuario);
      const tokenKey = `google_token_${user.id}`;
      localStorage.setItem(tokenKey, token);
    }
  }

  async initializeGapi(): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        this.tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: this.CLIENT_ID,
          scope: this.SCOPES,
          callback: (response: any) => {
            if (response.access_token) {
              this.accessToken = response.access_token;
              this.saveTokenForCurrentUser(response.access_token);
            }
          },
        });
        this.isInitialized = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async authenticate(): Promise<boolean> {
    try {
      await this.initializeGapi();
      
      return new Promise((resolve) => {
        this.tokenClient.callback = (response: any) => {
          if (response.access_token) {
            this.accessToken = response.access_token;
            this.saveTokenForCurrentUser(response.access_token);
            resolve(true);
          } else {
            resolve(false);
          }
        };
        this.tokenClient.requestAccessToken();
      });
    } catch (error) {
      return false;
    }
  }

  async getEvents(): Promise<any[]> {
    if (!this.accessToken) return [];
    
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${new Date().toISOString()}&maxResults=10&orderBy=startTime&singleEvents=true`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );
      
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      return [];
    }
  }

  async createEvent(event: any): Promise<any> {
    if (!this.accessToken) throw new Error('No autenticado');
    
    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        }
      );
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(eventId: string): Promise<any> {
    if (!this.accessToken) throw new Error('No autenticado');
    
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );
      
      return response.ok;
    } catch (error) {
      throw error;
    }
  }

  async updateEvent(eventId: string, event: any): Promise<any> {
    if (!this.accessToken) throw new Error('No autenticado');
    
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        }
      );
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  isSignedIn(): boolean {
    return !!this.accessToken;
  }
}