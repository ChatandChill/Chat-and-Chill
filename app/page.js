"use client";
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [entered, setEntered] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('chat-pin-entered');
    if (saved === 'yes') {
      setEntered(true);
      const name = localStorage.getItem('chat-username') || 'Anonymous';
      setUsername(name);
      fetchMessages();
      const channel = supabase.channel('messages').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      }).subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true }).limit(100);
    if (data) setMessages(data);
  };

  const checkPin = (e) => {
    e.preventDefault();
    if (pinInput === '1707') {
      setEntered(true);
      localStorage.setItem('chat-pin-entered', 'yes');
      const name = prompt('Enter your name:') || 'Anonymous';
      setUsername(name);
      localStorage.setItem('chat-username', name);
      fetchMessages();
      const channel = supabase.channel('messages').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      }).subscribe();
    } else {
      alert('Wrong PIN! Hint is 1707');
    }
  };
